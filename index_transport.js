const express = require('express');
const app = express();
const db = require('./database');
const path = require('path');

// set and use express evironment
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('./public', express.static(path.join(__dirname, 'public'))); // to serve static files
let bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// render transport page
app.get('/transport', (req, res) => {
  db.promise().execute('SELECT * FROM sv_hoteles_input').then(([rows]) => {
    res.render('transporte_index', { rows });
  }).catch(err => {
    throw err;
  });
});
/*     const sql = 'SELECT * FROM sv_hoteles_input';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('transporte_index', { data });
    });
}); */

app.listen(3000, 'localhost', () => {
  console.log("Listening!!!");
});