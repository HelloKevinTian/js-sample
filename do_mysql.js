var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '192.168.1.33',
    user: 'root',
    password: '123456',
    database: 'facebook_test_by_tianwen'
});

connection.connect();

connection.query('SELECT * FROM zfput_account', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', error, results);
});

connection.end();