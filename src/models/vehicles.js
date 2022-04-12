/* eslint-disable no-unused-vars */
const db = require('../helpers/db');


exports.countVehicles = (data, cb) =>{
	db.query(`SELECT COUNT(*) as total FROM vehicles WHERE name LIKE '%${data.name}%' AND id LIKE '%${data.id}%' AND location LIKE '%${data.location}%'`, (err, res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.countVehiclesAsyn = (data) => new Promise((resolve, reject) =>{
	db.query(`SELECT COUNT(*) as total FROM vehicles WHERE name LIKE '%${data.name}%' AND id LIKE '%${data.id}%' AND location LIKE '%${data.location}%'`, (err, res) =>{
		if (err) reject (err);
		resolve(res);
	});
});

exports.getVehicles = (data, cb)=>{
	let sql = `SELECT id, name, price, description, status, location, category, stock FROM vehicles WHERE name LIKE '%${data.name}%' AND id LIKE '%${data.id}%' AND location LIKE '%${data.location}%' ORDER BY ${data.orderBy} ${data.sortType} LIMIT ${data.limit} OFFSET ${data.offset}`;
	let result = db.query(sql, (err,res) =>{
		if (err) throw err;
		cb(res);
	});
	console.log(result.sql);
};

exports.getVehiclesAsyn = (data) => new Promise((resolve, reject) =>{
	db.query(`SELECT id, name, price, description, status, location, category, stock, image FROM vehicles WHERE name LIKE '%${data.name}%' AND id LIKE '%${data.id}%' AND location LIKE '%${data.location}%' ORDER BY ${data.orderBy} ${data.sortType} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) =>{
		if (err) reject(err);
		resolve (res);
	});
});

exports.getVehicle = (id, cb) =>{
	db.query ('SELECT id, name, price, description, status, location, stock, image FROM vehicles WHERE id = ?', [id],(err,res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.getVehicleAsyn = (id) => new Promise((resolve, reject) =>{
	db.query ('SELECT id, idCategory, name, price, description, status, idLocation, stock, image FROM vehicles WHERE id = ?', [id],(err,res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.deleteVehicle = (id ,cb) =>{
	db.query('DELETE FROM vehicles WHERE id=?',[id], (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.deleteVehicleAsyn = (id) => new Promise((resolve, reject) =>{
	db.query('DELETE FROM vehicles WHERE id=?',[id], (err,res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.postVehicle = (data,cb) =>{
	db.query('INSERT INTO vehicles SET ?',[data], (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.postVehicleAsyn = (data) => new Promise((resolve, reject) =>{
	db.query('INSERT INTO vehicles SET ?',[data], (err,res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.patchVehicle = (id, data, cb) =>{
	let result = db.query('UPDATE vehicles SET ? WHERE id=?',[data, id],(err,res) =>{
		if(err) throw err;
		cb(res);
	});
	console.log(result.sql);
};

exports.patchVehicleAsyn = (id, data) => new Promise((resolve, reject) =>{
	db.query('UPDATE vehicles SET ? WHERE id=?',[data, id],(err,res) =>{
		if(err) reject(err);
		resolve(res);
	});
});

exports.searchVehicles = (data,cb)=>{
	let sql = `SELECT id, name, location, image FROM vehicles WHERE name LIKE '%${data.name}%' AND location LIKE '${data.location}%'`;
	db.query(sql, (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.searchVehiclesAsyn = (data) => new Promise((resolve, reject) =>{
	let sql = `SELECT id, name, idLocation, image FROM vehicles WHERE name = '${data.name}' AND idLocation =${data.idLocation}`;
	db.query(sql, (err,res) =>{
		if (err) reject(err);
		resolve(res);
	});
});