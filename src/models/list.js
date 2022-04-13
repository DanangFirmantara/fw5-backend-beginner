
const db = require ('../helpers/db');

exports.countList = (data, cb) =>{
	db.query(`SELECT COUNT(*) AS total FROM vehicles WHERE idCategory = ${data.filterBy}`, (err, res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.countListAsync = (data) => new Promise((resolve,reject) =>{
	db.query(`SELECT COUNT(*) AS total FROM vehicles WHERE idCategory = ${data.filterBy}`, (err, res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.getList = (data, cb) =>{
	db.query(`SELECT name, description, location, idCategory, status, price FROM vehicles WHERE idCategory = '${data.filterBy}' ORDER BY ${data.orderBy} ${data.sortType} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.getListAsync = (data) =>new Promise((resolve, reject) =>{
	db.query(`SELECT * FROM vehicles WHERE idCategory = ${data.filterBy} ORDER BY ${data.orderBy} ${data.sortType} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) =>{
		if (err) reject(err);
		resolve(res);
	});
});