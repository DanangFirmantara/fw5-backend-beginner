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
	db.query(`SELECT id, rentStartDate, rentEndDate, userId, vehicleId, quantity, codePayment, total FROM histories WHERE id LIKE'%${data.id}%' ORDER BY ${data.orderBy} ${data.sortType} LIMIT ${data.limit} OFFSET ${data.offset}`, (err,res) =>{
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
	db.query('SELECT h.id, h.rentStartDate, h.rentEndDate, h.quantity, h.codePayment, h.total, r.idCard, r.name, r.lastName, h.createdAt, r.contact, r.email, r.payment, r.bookedCode, v.name AS vehicleName, v.image, c.name AS vehicleCategory, l.name AS vehicleLocation  FROM histories h LEFT JOIN reservation r ON h.idReservation = r.id LEFT JOIN vehicles v ON h.vehicleId = v.id LEFT JOIN category c ON v.idCategory = c.id LEFT JOIN location l ON v.idLocation = l.id WHERE h.id = ?', [id], (err,res) =>{
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

exports.getHistoryUserAsync = (data)=>new Promise((resolve, reject)=>{
	db.query(`SELECT h.id AS id, v.name AS vehicleName, h.rentStartDate, h.rentEndDate, h.quantity, v.image as image, h.isPayment as status, h.codePayment, h.total	 FROM histories h  LEFT JOIN vehicles v ON h.vehicleId = v.id WHERE userId = ${data.userId} ORDER BY ${data.orderBy} ${data.sortType} LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res)=>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.countHistoryUserAsync = (data) =>new Promise((resolve,reject)=>{
	db.query(`SELECT COUNT(*) AS total FROM histories WHERE userId= ${data.userId} `, (err,res)=>{
		if (err) reject(err);
		resolve(res);
	});
});

exports.finishPayment = (codePayment)=> new Promise((resolve, reject)=>{
	db.query('UPDATE histories SET isPayment = 1 WHERE codePayment = ?', [codePayment], (err, res)=>{
		if(err) reject(err);
		resolve(res);
	});
});