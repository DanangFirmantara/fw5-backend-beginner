/* eslint-disable no-unused-vars */
const db = require('../helpers/db');

exports.countUser = (data, cb) =>{
	db.query(`SELECT COUNT(*) AS total FROM users WHERE id LIKE '%${data.id}%' AND username LIKE '%${data.username}%'`, (err, res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.getUsers = (data, cb)=>{
	let result = db.query(`SELECT id, username, email, contact FROM users WHERE id LIKE '%${data.id}%' AND username LIKE '%${data.username}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res) =>{
		if (err) throw err;
		cb(res);
	});
	console.log(result.sql);
};

exports.getUser = (id, cb) =>{
	let sql = `SELECT * FROM users
    WHERE
        id=${id}`;
	db.query (sql, (err, res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.postUser = (data, cb) =>{
	let results = db.query('INSERT INTO users (username, email, contact, password) VALUE (?,?,?,?)',[data.username, data.email, data.contact, data.password], (err,res) =>{
		if (err) throw err;
		cb(res);
	});
	console.log(results.sql);
};

exports.deleteUser = (id, cb) =>{
	let sql = `DELETE FROM users
    WHERE
        id =${id}`;
	db.query(sql,(err, res) =>{
		if(err) throw err;
		cb(res);
	});
};

exports.patchUser = (id, data, cb) =>{
	let sql = `UPDATE users
    SET
        fullName = '${data.fullName}',
        gender = '${data.gender}',
        email = '${data.email}',
        address = '${data.address}',
        contact = '${data.contact}',
        displayName = '${data.displayName}',
        birthDate = ?
    WHERE
        id = ${id}`;

	db.query(sql,[data.birthDate], (err, res) =>{
		if (err) throw err;
		cb (res);
	});
};

exports.searchUser = (data,cb)=>{
	let sql = `SELECT id, username, email FROM users WHERE username = '${data.username}' AND email ='${data.email}'`;
	db.query(sql, (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};