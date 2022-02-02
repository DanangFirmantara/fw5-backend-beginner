const db = require ('../helpers/db');

exports.getHistory = (id, cb) =>{
	db.query(`SELECT id, rentStartDate, prepayment, userId, vehicleId, quantity FROM histories WHERE id LIKE '%${id}%'`, (err,res) =>{
		if(err) throw err;
		cb(res);
	});
};