const mysql = require('mysql');
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

const config = {
	host : DB_HOST,
	user : DB_USER,
	password : DB_PASSWORD,
	database : DB_NAME
};

const db = mysql.createPool(config);

console.log('DB Connected');

// const db = mysql.createConnection({
// 	host : DB_HOST,
// 	user : DB_USER,
// 	password : DB_PASSWORD,
// 	database : DB_NAME
// });


// db.connect();

module.exports = db;