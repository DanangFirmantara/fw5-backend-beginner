const db = require ('../helpers/db');

exports.counList = (data, cb) =>{
	db.query(`SELECT COUNT(*) AS total FROM vehicles WHERE category = '${data.filterBy}'`, (err, res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.getList = (data, cb) =>{
	let result= db.query(`SELECT name, description, location, category, status, price FROM vehicles WHERE category = '${data.filterBy}' ORDER BY ${data.orderBy} ${data.sortType} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) =>{
		if (err) throw err;
		cb(res);
	});
	console.log(result.sql);
};