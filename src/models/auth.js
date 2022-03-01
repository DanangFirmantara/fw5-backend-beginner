const db = require('../helpers/db');


exports.login = (data) => new Promise((resolve, reject) =>{
	db.query('SELECT id, username, email, password FROM users WHERE username = ? OR email = ?', [data.username, data.username], (err, res) =>{
		if (err) reject(err);
		resolve (res);
	});
});

exports.createRequest = (userId, code)=> new Promise((resolve, reject)=>{
	db.query('INSERT INTO forgot_request (userId, code) VALUES (?,?)', [userId, code], (err, res)=>{
		if(err) reject(err);
		resolve(res);
	});
});

exports.getRequest = (code)=>new Promise((resolve, reject)=>{
	db.query('SELECT id, userId, isExpired from forgot_request WHERE code = ? OR userId = ? AND isExpired = 0', [code, code], (err,res)=>{
		if(err) reject(err);
		resolve(res);
	});
});

exports.patchRequest = (userId) =>new Promise((resolve, reject)=>{
	db.query('UPDATE forgot_request SET isExpired = 1 WHERE userId = ?', [userId],(err,res)=>{
		if(err) reject(err);
		resolve(res);
	});
});