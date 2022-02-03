const db = require('../helpers/db');

exports.getPopular = (location,cb) =>{
	db.query(`SELECT v.name AS vehicleName, COUNT(*) AS rentCount , v.location FROM histories h LEFT JOIN vehicles V ON h.vehicleId = v.id WHERE v.location LIKE '%${location}%' GROUP BY h.vehicleId ORDER BY v.location ASC, rentCount DESC`, (err, res) =>{
		if (err) throw err;
		cb (res);
	});
};