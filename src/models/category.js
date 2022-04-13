const db = require('../helpers/db');


exports.getCategory = (id) => new Promise((resolve, reject)=>{
	db.query('SELECT id, name FROM category WHERE id = ?', [id],(err, res)=>{
		if(err) reject(err);
		resolve(res);
	});
});

exports.getCategories = () => new Promise((resolve, reject)=>{
	db.query('SELECT id, name FROM category', (err, res)=>{
		if(err) reject(err);
		resolve(res);
	});
});