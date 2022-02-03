const db = require ('../helpers/db');

exports.getList = (filterBy, cb) =>{
	db.query('SELECT name, description, category, status, price FROM vehicles WHERE category = ?',[filterBy], (err, res) =>{
		if (err) throw err;
		cb(res);
	});
};