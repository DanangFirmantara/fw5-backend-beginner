const db = require ('../helpers/db');

exports.getList = (filterBy, cb) =>{
	db.query('SELECT name, description, type, status, price FROM vehicles WHERE type = ?',[filterBy], (err, res) =>{
		if (err) throw err;
		cb(res);
	});
};