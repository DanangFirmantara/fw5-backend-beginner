const db = require('../helpers/db');

exports.countPopular = (data, cb) =>{
	db.query(`SELECT COUNT(*) as total FROM histories h LEFT JOIN vehicles V ON h.vehicleId = v.id WHERE v.location LIKE '%${data.location}%' GROUP BY h.vehicleId`, (err, res) =>{
		if(err) throw err;
		cb(res);
	});
};

exports.getPopular = (data,cb) =>{
	db.query(`SELECT v.name AS vehicleName, COUNT(*) AS rentCount , v.location FROM histories h LEFT JOIN vehicles V ON h.vehicleId = v.id WHERE v.location LIKE '%${data.location}%' GROUP BY h.vehicleId ORDER BY v.location ASC, rentCount DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) =>{
		if (err) throw err;
		cb (res);
	});
};