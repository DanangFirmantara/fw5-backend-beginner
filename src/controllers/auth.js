const { response } = require('../helpers/response');
const authModel = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {APP_SECRET} = process.env;

exports.login = async(req, res) =>{
	try{
		let {username, password} = req.query;
		let data = {username, password};
		const resultLogin = await authModel.login(data);
		const result = await bcrypt.compare(data.password, resultLogin[0].password);
		if (result){
			data = { id : resultLogin[0].id};
			const token = jwt.sign(data, APP_SECRET);
			response(res,'login successfully',[token]);
		} else {
			response(res, 'Cek your username, email, and password');
		}	
	} catch (err) {
		response(res, 'Unexpected error', err, null, 500);
	}
};