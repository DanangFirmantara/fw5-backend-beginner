/* eslint-disable no-unused-vars */
const db = require('../helpers/db');


exports.getVehicles = (cb)=>{
	let sql = 'SELECT * FROM vehicles';
	db.query(sql, (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.getVehicle = (id, cb) =>{
	let sql = `SELECT * FROM vehicles
	 WHERE 
	 	id=${id}`;
	db.query(sql, (err,res) =>{
		if(err) throw err;
		cb(res);
	});
};

exports.deleteVehicle = (id,cb) =>{
	let sql = `DELETE FROM vehicles
	 WHERE 
	 	id=?`;
	db.query(sql,[id], (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.postVehicle = (data,cb) =>{
	let sql = `INSERT INTO vehicles (
		name, 
		location,
		description,
		price,
		status,
		stock,
		image
	) 
    VALUES (
		'${data.name}', 
		'${data.location}',
		'${data.description}',
		${data.price},
		${data.status},
		${data.stock},
		'${data.image}'
	)`;
	db.query(sql, (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.patchVehicle = (id, data, cb) =>{
	let sql = `UPDATE vehicles 
	SET 
		name = '${data.name}', 
		location = '${data.location}',
		description = '${data.description}',
		price = ${data.price},
		status = ${data.status},
		stock = ${data.stock},
		image = '${data.image}'
	WHERE 
		id = ${id}`;
	db.query(sql,(err,res) =>{
		if(err) throw err;
		cb(res);
	});
};

exports.searchVehicles = (data,cb)=>{
	let sql = `SELECT name, location FROM vehicles WHERE name like '%${data.name}%' AND location LIKE '${data.location}%'`;
	db.query(sql, (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};