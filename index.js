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
  db.query('SELECT * FROM sv_hotel_in ORDER BY hora_creacion DESC', function(err, result, fields) {
    if (err) throw err;
    arribos = result;
  });
});

let partidas = [];
db.connect(function(err) {
  if (err) throw err;
  db.query('SELECT * FROM sv_hotel_out ORDER BY hora_creacion DESC', function(err, result, fields) {
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
  // objeto formulario input
  let input = req.body;
  input['hotel'] = "un_hotel";
  // unique id
  input['id'] = uuidv4();
  // hora y fecha de creacion
  const created_at = new Date();
  // enviar query a mysqldb
  let sql = "";
  if (input.check == 'check_in') {
    // ARRIBOS
    sql = "INSERT INTO sv_hotel_in (id, hora_creacion, vuelo, hora_de_vuelo, fecha, nro_habitacion, nro_personas, origen, destino)\
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
    db.query(sql, [input.id, created_at, input.vuelo, input.hora, input.fecha, input.nro_habitacion, input.nro_personas, input.puerto, input.hotel], function (err, result) {
      if (err) throw err;
    });
  } else {
    // PARTIDAS
    // calcular hora -3.5 para pickup ------------------->
    let hora_vuelo = input.hora.split(":");
    let h = parseInt(hora_vuelo[0]);
    let m = parseInt(hora_vuelo[1]);
    let hour_flag = 0;
    let day_flag = 0;
    if (m >= 30) {
      m = m - 30;
    } else {
      m = m + 30;
      hour_flag = 1;
    }
    if (h < 3) {
      hour_flag == 1 ? h = h + 24 - 4 : h = h + 24 - 3; // check if hour flag is on
      day_flag = 1; // activate day flag
    } else if (h == 3) {
      hour_flag == 1 ? h = 23 : h = 0; // check if hour flag is on
      if (h == 23) {
        day_flag = 1; // activate day flag
      }
    } else {
      hour_flag == 1 ? h = h - 4 : h = h - 3; // hour bigger than 4, check if hour_flag is on
    }
    // formar hora pickup en string
    let h_to_str = "";
    let m_to_str = "";
    let pickup = "";
    if (h <= 9) {
      h_to_str = "0" + h.toString();
    } else {
      h_to_str = h.toString();
    }
    if (m <= 9) {
      m_to_str = "0" + m.toString();
    } else {
      m_to_str = m.toString();
    }
    pickup = h_to_str + ":" + m_to_str; // hora pickup lista -------------->
    // finalmente, checkear flag de fecha
    if (day_flag == 1) {
      const fecha = input.fecha.split("-", 3);
      let dia = parseInt(fecha[2]);
      let mes = parseInt(fecha[1]);
      let año = parseInt(fecha[0]);
      let month_flag = 0;
      if (dia == 1) {
        mes = mes - 1;
        month_flag = 1;
        if (month_flag == 1) {
          if (mes == 0) {
            mes = 12;
            año = año - 1;
          }
        }
        if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
          dia = 31;
        }
        else if (mes == 2) {
          dia = 28;
        }
        else {
          dia = 30;
        }
      } else {
        dia = dia - 1;
      }
      pickup = pickup + " (" + (dia).toString() + "/" + mes.toString() + "/" + año.toString() + ")";
      console.log("Fecha: " + input.fecha + " " + input.hora);
      console.log("Pickup: " + pickup);
    }
    // Enviar query con pickup
    sql = "INSERT INTO sv_hotel_out (id, hora_creacion, vuelo, hora_de_vuelo, hora_pickup, fecha, nro_habitacion, nro_personas, nro_valijas, origen, destino)\
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    db.query(sql, [input.id, created_at, input.vuelo, input.hora, pickup, input.fecha, input.nro_habitacion, input.nro_personas, input.nro_valijas, input.hotel, input.puerto], function (err, result) {
      if (err) throw err;
    });
  }
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