const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'ayrton',
    password: 'password',
    database: 'sv_hoteles'
});

// set and use express evironment
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public'))); // to serve static files
let bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/hotels', (req, res) => {
    res.render('hotel_index');
});

app.post('/hotels', (req, res) => {
    let input = req.body;
    input['id'] = uuidv4();
    con.connect(function(err) {
        if (err) throw err;
        const sql = "INSERT INTO sv_hoteles_input (id, check_, hora, fecha, nro_habitacion, nro_personas, origen)\
        VALUES (?, ?, ?, ?, ?, ?, ?);";
        con.query(sql, [input.id, input.check, input.hora, input.fecha, input.nro_habitacion, input.nro_personas, input.desde], function (err, result) {
            if (err) throw (err)
        });
    });
    console.log(input.id);
});

app.get('/transport', (req, res) => {
    res.render('transporte_index');
});

app.listen(3000, 'localhost', () => {
    console.log("Listening!!!");
});