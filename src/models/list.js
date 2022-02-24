
const db = require ('../helpers/db');

exports.countList = (data, cb) =>{
	db.query(`SELECT COUNT(*) AS total FROM vehicles WHERE category = '${data.filterBy}'`, (err, res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.countListAsync = (data) => new Promise((resolve,reject) =>{
	db.query(`SELECT COUNT(*) AS total FROM vehicles WHERE category = '${data.filterBy}'`, (err, res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.getList = (data, cb) =>{
	let result= db.query(`SELECT name, description, location, category, status, price FROM vehicles WHERE category = '${data.filterBy}' ORDER BY ${data.orderBy} ${data.sortType} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) =>{
		if (err) throw err;
		cb(res);
	});
	console.log(result.sql);
};

exports.getListAsync = (data) =>new Promise((resolve, reject) =>{
	db.query(`SELECT * FROM vehicles WHERE category = '${data.filterBy}' ORDER BY ${data.orderBy} ${data.sortType} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) =>{
		if (err) reject(err);
		resolve(res);
	});
});