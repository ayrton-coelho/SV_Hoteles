const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'ayrton',
    password: 'password',
    database: 'sv_hoteles',
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Database connected!');
});

module.exports = con;