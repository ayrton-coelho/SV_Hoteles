const express = require('express');
const app = express();
const path = require('path');

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

let form_input = [];

app.post('/hotels', (req, res) => {
    form_input.push(req.body);
    console.log(req.body);
    console.log(form_input);
});

app.get('/transport', (req, res) => {
    res.render('transporte_index', { form_input });
});

app.listen(3000, 'localhost', () => {
    console.log("Listening!!!");
});