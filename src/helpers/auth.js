const jwt = require('jsonwebtoken');
const { response } = require('./response');
const {APP_SECRET} = process.env;

exports.verify = async(req, res, next)=>{
	const auth = req.headers.authorization;
	if (auth.startsWith('Bearer')){
		const token = auth.split(' ')[1];
		if(token){
			try{
				const data = jwt.verify(token, APP_SECRET);
				req.userData = data;
				if(data){
					console.log(data);
					return next();
				} else{
					response(res,'user not verified',null, null, 403);
				}
			} catch(err){
				response(res, 'user not verified', null, null, 403);
			}
		} else{
			response(res, 'User not verified', null, null, 403);
		}
	}
};