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
	 	id=${id}`;
	db.query(sql, (err,res) =>{
		if (err) throw err;
		cb();
	});
};

exports.postVehicle = (data,cb) =>{
	let sql = `INSERT INTO vehicles (
		name, 
		color, 
		price, 
		isAvailable
	) 
    VALUES (
		'${data.name}', 
		'${data.color}', 
		${data.price}, 
		${data.isAvailable}
	)`;
	db.query(sql, (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.patchVehicle = (id, data, cb) =>{
	let sql = `UPDATE vehicles 
	SET 
		name = '${data.name}' ,
		color =  '${data.color}', 
		price = ${data.price}, 
		isAvailable = ${data.isAvailable} 
	WHERE 
		${id}`;

	db.query(sql,(err,res) =>{
		if(err) throw err;
		cb(res);
	});
};