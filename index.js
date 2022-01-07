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

// load DB tables
let arribos = [];
db.connect(function(err) {
  if (err) throw err;
  db.query('SELECT * FROM sv_hotel_in ORDER BY fecha ASC', function(err, result, fields) {
    if (err) throw err;
    arribos = result;
  });
});

let partidas = [];
db.connect(function(err) {
  if (err) throw err;
  db.query('SELECT * FROM sv_hotel_out ORDER BY fecha ASC', function(err, result, fields) {
    if (err) throw err;
    partidas = result;
  });
});

// render hotel form page
app.get('/hotels', (req, res) => {
    res.render('hotel_index', { arribos, partidas });
});

// hotel form POST method
app.post('/hotels', (req, res) => {
    let input = req.body;
    input['id'] = uuidv4();
    let sql = "";
    if (input.check == 'check_in') {
      sql = "INSERT INTO sv_hotel_in (id, hora, fecha, nro_habitacion, nro_personas, puerto)\
        VALUES (?, ?, ?, ?, ?, ?);";
    } else {
      sql = "INSERT INTO sv_hotel_out (id, hora, fecha, nro_habitacion, nro_personas, puerto)\
        VALUES (?, ?, ?, ?, ?, ?);";
    }
    db.query(sql, [input.id, input.hora, input.fecha, input.nro_habitacion, input.nro_personas, input.puerto], function (err, result) {
            if (err) throw err;
    });
    res.redirect('/hotels');
    console.log(input.id);
});

// render transport page
app.get('/transport', (req, res) => {
    res.render('transporte_index', { arribos, partidas });
});

app.listen(3000, 'localhost', () => {
    console.log("Listening!!!");
});