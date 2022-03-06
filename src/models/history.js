const db = require ('../helpers/db');

exports.countHistory = (data, cb) =>{
	db.query(`SELECT COUNT(*) AS total FROM histories WHERE id LIKE '%${data.id}%'`, (err, res) =>{
		if (err) throw err;
		cb(res);
	});
};

exports.countHistoryAsync = (data) => new Promise((resolve, reject)=>{
	db.query(`SELECT COUNT(*) AS total FROM histories WHERE id LIKE '%${data.id}%'`, (err, res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.getHistories = (data, cb) =>{
	db.query(`SELECT id, rentStartDate, prepayment, userId, vehicleId, quantity FROM histories WHERE id LIKE '%${data.id}%' ORDER BY ${data.orderBy} ${data.sortType} LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res) =>{
		if(err) throw err;
		cb(res);
	});
};

exports.getHistoriesAsync = (data) => new Promise((resolve, reject)=>{
	db.query(`SELECT id, rentStartDate, prepayment, userId, vehicleId, quantity FROM histories WHERE id LIKE '%${data.id}%' ORDER BY ${data.orderBy} ${data.sortType} LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res) =>{
		if(err) reject(err);
		resolve(res);
	});
});

exports.postHistory = (data, cb) =>{
	db.query('INSERT INTO histories SET ?', [data], (err, res) =>{
		if(err) throw err;
		cb(res);
	});
};

exports.postHistoryAsync = (data) =>new Promise((resolve, reject)=>{
	db.query('INSERT INTO histories SET ?', [data], (err, res) =>{
		if(err) reject(err);
		resolve(res);
	});
});

exports.getHistory = (id, cb) =>{
	db.query('SELECT * FROM histories WHERE id = ?', [id], (err,res) =>{
		if (err) throw err;
		cb (res);
	});
};

exports.getHistoryAsync = (id) => new Promise((resolve, reject)=>{
	db.query('SELECT * FROM histories WHERE id = ?', [id], (err,res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.deleteHistory = (id, cb) =>{
	db.query('DELETE FROM histories WHERE id = ?', [id], (err,res) =>{
		if (err) throw err;
		cb (res);
	});
};

exports.deleteHistoryAsync = (id) => new Promise((resolve, reject)=>{
	db.query('DELETE FROM histories WHERE id = ?', [id], (err,res) =>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.patchHistory = (data, cb) =>{
	db.query('UPDATE histories SET quantity = ? WHERE id = ?', [data.quantity, data.id], (err, res) =>{
		if (err) throw err;
		cb (res);
	});
};

exports.patchHistoryAsync = (data) => new Promise((resolve, reject)=>{
	db.query('UPDATE histories SET quantity = ? WHERE id = ?', [data.quantity, data.id], (err, res) =>{
		if (err) reject(err);
		resolve(res);
	});
});