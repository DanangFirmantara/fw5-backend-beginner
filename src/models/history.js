const db = require ('../helpers/db');

exports.getHistories = (id, cb) =>{
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

exports.getHistory = (id, cb) =>{
	db.query('SELECT * FROM histories WHERE id = ?', [id], (err,res) =>{
		if (err) throw err;
		cb (res);
	});
};

exports.deleteHistory = (id, cb) =>{
	db.query('DELETE FROM histories WHERE id = ?', [id], (err,res) =>{
		if (err) throw err;
		cb (res);
	});
};

exports.patchHistory = (data, cb) =>{
	db.query('UPDATE histories SET quantity = ? WHERE id = ', [data.quantity, data.id], (err, res) =>{
		if (err) throw err;
		cb (res);
	});
};