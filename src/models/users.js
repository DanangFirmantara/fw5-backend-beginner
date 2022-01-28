/* eslint-disable no-unused-vars */
const db = require('../helpers/db');

exports.getUsers = (cb)=>{
	let sql = 'SELECT * FROM users';
	db.query(sql, (err,res) =>{
		if (err) throw err;
		cb(res);
	});
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
	let sql = `INSERT INTO users (
        fullName,
        gender,
        email,
        address,
        contact,
        displayName,
        birthDate
    ) 
    VALUE (
        '${data.fullName}',
        ${data.gender},
        '${data.email}',
        '${data.address}',
        '${data.contact}',
        '${data.displayName}',
        '${data.birthDate}'
    )`;
	db.query(sql, (err,res) =>{
		if (err) throw err;
		cb(res);
	});
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
        gender = ${data.gender},
        email = '${data.email}',
        address = '${data.address}',
        contact = '${data.contact}',
        displayName = '${data.displayName}',
        birthDate = '${data.birthDate}'
    WHERE
        id = ${id}`;

	db.query(sql, (err, res) =>{
		if (err) throw err;
		cb (res);
	});
};