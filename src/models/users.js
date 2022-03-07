const db = require('../helpers/db');

exports.countUser = (data, cb) =>{
	db.query(`SELECT COUNT(*) AS total FROM users WHERE id LIKE '%${data.id}%' AND username LIKE '%${data.username}%'`, (err, res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.countUserAsyn = (data) => new Promise((resolve, reject) =>{
	db.query(`SELECT COUNT(*) AS total FROM users WHERE id LIKE '%${data.id}%' AND username LIKE '%${data.username}%'`, (err, res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.getUsers = (data, cb)=>{
	db.query(`SELECT id, username, email, contact FROM users WHERE id LIKE '%${data.id}%' AND username LIKE '%${data.username}%'ORDER BY ${data.orderBy} ${data.sortType} LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.getUsersAsyn = (data) => new Promise((resolve, reject) =>{
	db.query(`SELECT id, username, email, contact FROM users WHERE id LIKE '%${data.id}%' AND username LIKE '%${data.username}%'ORDER BY ${data.orderBy} ${data.sortType} LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.getUser = (id, cb) =>{
	db.query ('SELECT * FROM users WHERE id=?',[id], (err, res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.getUserAsync = (id)=> new Promise((resolve, reject)=>{
	db.query ('SELECT * FROM users WHERE id=?',[id], (err, res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.getUserAsyn = (id) => new Promise((resolve, reject) =>{
	db.query ('SELECT id, email, username, contact, fullName, gender, address, displayName, birthDate FROM users WHERE id=?',[id], (err, res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.getUserEditPasswordAsync = (id)=> new Promise((resolve, reject)=>{
	db.query ('SELECT id, password FROM users WHERE id = ?', [id], (err, res)=>{
		if(err) reject(err);
		resolve(res);
	});
});

exports.postUser = (data, cb) =>{
	db.query('INSERT INTO users SET ?',[data], (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.postUserAsyn = (data) => new Promise((resolve, reject) =>{
	db.query('INSERT INTO users SET ?',[data], (err,res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.deleteUser = (id, cb) =>{
	db.query('DELETE FROM users WHERE id =id',[id],(err, res) =>{
		if(err) throw err;
		cb(res);
	});
};

exports.deleteUserAsyn = (id) => new Promise((resolve, reject) =>{
	db.query('DELETE FROM users WHERE id =?',[id],(err, res) =>{
		if(err) reject(err);
		resolve(res);
	});
});

exports.patchUser = (id, data, cb) =>{
	db.query('UPDATE users SET ? WHERE id = ?',[data, id], (err, res) =>{
		if (err) throw err;
		cb (res);
	});
};

exports.patchUserAsyn = (id, data) => new Promise((resolve, reject) =>{
	db.query('UPDATE users SET ? WHERE id = ?',[data, id], (err, res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.searchUser = (data,cb)=>{
	db.query(`SELECT id, username, email FROM users WHERE username = '${data.username}' AND email ='${data.email}'`, (err,res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.searchUserAsyn = (data) =>new Promise((resolve, reject) =>{
	db.query(`SELECT id, username, email FROM users WHERE username = '${data.username}' AND email ='${data.email}'`, (err,res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.getUserByEmailAsync = (email) =>new Promise((resolve, reject)=>{
	db.query('SELECT id, email, username FROM users WHERE email = ?',[email],(err,res)=>{
		if(err) reject(err);
		resolve(res);
	});
});