const jwt = require('jsonwebtoken');
const { response } = require('./response');
const { responseHandler } = require('./responseHandler');
const {APP_SECRET} = process.env;
const userModel = require('../models/users');

exports.verify = async(req, res, next)=>{
	const auth = req.headers.authorization;
	if (auth && auth.startsWith('Bearer')){
		const token = auth.split(' ')[1];
		if(token){
			try{
				const data = jwt.verify(token, APP_SECRET);
				req.userData = data;
				if(data){
					return next();
				} else{
					return response(res,'user not verified',null, null, 403);
				}
			} catch(err){
				return response(res, 'user not verified', null, null, 403);
			}
		} else{
			return response(res, 'User not verified', null, null, 403);
		}
	} else{
		return response(res, 'user not verified',null,null,403);
	}
};

exports.verifyAdmin = async(req, res, next) =>{
	try{
		const {id} = req.userData;
		const user = await userModel.getUserRole(id);
		if(user[0].role === 'Admin'){
			return next();
		} else{
			return responseHandler(res, 403, 'Unauthorized');
		}
	} catch(err){
		return responseHandler(res, 500, 'Unexpected error');
	}
};