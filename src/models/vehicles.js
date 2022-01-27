const db = require('../helpers/db');


exports.getVehicles = (cb)=>{
	db.query('SELECT * FROM vehicles', (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.getVehicle = (id, cb) =>{
	db.query('SELECT * FROM vehicles WHERE id=?',[id], (err,res) =>{
		if(err) throw err;
		cb(res);
	});
};

exports.deleteVehicle = (id,cb) =>{
	db.query('DELETE FROM vehicles WHERE id=?',[id], (err,res) =>{
		if (err) throw err;
		cb();
	});
};

exports.postVehicle = (data,cb) =>{
	let sql = `INSERT INTO vehicles (name, color, price, isAvailable) 
    VALUES (${data.name}, ${data.color}, ${data.price}, ${data.isAvailable})`;
	db.query(sql, (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.patchVehicle = (id, data, cb) =>{
	db.query(`UPDATE vehicles SET name=? , color=?, price=?, isAvailable=? WHERE ${id}`, [data.name, data.color, data.price, data.isAvailable] ,(err,res) =>{
		if(err) throw err;
		cb(res);
	});
};