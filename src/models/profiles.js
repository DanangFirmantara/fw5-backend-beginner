const db = require ('../helpers/db');

exports.getProfiles = (id, cb) =>{
	db.query(`SELECT id, fullName, displayName, email, contact , gender, address, birthDate FROM users WHERE id LIKE '%${id}%'`, (err, res) =>{
		if(err) throw err;
		cb(res);
	});
};