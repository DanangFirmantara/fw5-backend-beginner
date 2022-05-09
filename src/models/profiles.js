const db = require ('../helpers/db');

exports.getProfiles = (id, cb) =>{
	db.query(`SELECT id, fullName, displayName, email, contact , gender, address, birthDate FROM users WHERE id LIKE '%${id}%'`, (err, res) =>{
		if(err) throw err;
		cb(res);
	});
};

exports.getProfileAsync = (id) => new Promise((resolve, reject)=>{
	db.query('SELECT id, username,role, fullName, displayName, email, contact , gender, address, birthDate, image, isVerify, createdAt FROM users WHERE id=?',[id],(err,res)=>{
		if(err) reject(err);
		resolve(res);
	});
});