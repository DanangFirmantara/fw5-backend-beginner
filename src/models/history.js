const db = require ('../helpers/db');

exports.getHistory = (id, cb) =>{
	db.query(`SELECT id, rentStartDate, prepayment, userId, vehicleId, quantity FROM histories WHERE id LIKE '%${id}%'`, (err,res) =>{
		if(err) throw err;
		cb(res);
	});
};

exports.postHistory = (data, cb) =>{
	db.query('INSERT INTO histories (rentStartDate, rentEndDate, prepayment, userId, vehicleId, quantity) VALUES (?,?,?,?,?,?)', [data.rentStartDate, data.rentEndDate, data.prepayment, data.userId, data.vehicleId, data.quantity], (err, res) =>{
		if(err) throw err;
		cb(res);
	});
};