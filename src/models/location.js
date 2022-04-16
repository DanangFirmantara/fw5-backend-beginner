const db = require('../helpers/db');

exports.getLocation = (id) =>new Promise((resolve, reject)=>{
	db.query('SELECT id, name FROM location WHERE id= ?', [id], (err, res)=>{
		if(err) reject(err);
		resolve(res);
	});
});

exports.getListLocation = () => new Promise((resolve, reject) =>{
	db.query('SELECT id, name FROM location', (err, res)=>{
		if(err) reject(err);
		resolve(res);
	});
});