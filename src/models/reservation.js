const db = require('../helpers/db');


exports.postReservation = (data)=> new Promise((resolve, reject)=>{
	db.query('INSERT INTO reservation SET ?', [data],(err, res)=>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.getReservation = (id) => new Promise((resolve, reject)=>{
	db.query('SELECT * FROM reservation WHERE id=?', [id],(err, res)=>{
		if(err) reject(err);
		resolve(res);
	});
});