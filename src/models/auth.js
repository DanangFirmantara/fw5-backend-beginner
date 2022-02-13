const db = require('../helpers/db');


exports.login = (data) => new Promise((resolve, reject) =>{
	db.query('SELECT id, username, email, password FROM users WHERE username = ? OR email = ?', [data.username, data.username], (err, res) =>{
		if (err) reject(err);
		resolve (res);
	});
});