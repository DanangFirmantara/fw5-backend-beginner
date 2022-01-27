const mysql = require('mysql');

const db = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'vehicle-rent'
});

db.connect();

module.exports = db;