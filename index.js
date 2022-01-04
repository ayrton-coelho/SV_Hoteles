const express = require('express');
const app = express();
const db = require('./database');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// set and use express evironment
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public'))); // to serve static files
let bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// render hotel form page
app.get('/hotels', (req, res) => {
    res.render('hotel_index');
});

// hotel form POST method
app.post('/hotels', (req, res) => {
    let input = req.body;
    input['id'] = uuidv4();
    const sql = "INSERT INTO sv_hoteles_input (id, check_, hora, fecha, nro_habitacion, nro_personas, origen)\
        VALUES (?, ?, ?, ?, ?, ?, ?);";
    db.query(sql, [input.id, input.check, input.hora, input.fecha, input.nro_habitacion, input.nro_personas, input.desde], function (err, result) {
            if (err) throw err;
        });
    res.redirect('/hotels');
    console.log(input.id);
});

// render transport page
app.get('/transport', (req, res) => {
    db.promise().execute('SELECT * FROM sv_hoteles_input ORDER BY fecha ASC').then(([rows]) => {
      res.render('transporte_index', { rows });
    }).catch(err => {
      throw err;
    });
  });

app.listen(3000, 'localhost', () => {
    console.log("Listening!!!");
});