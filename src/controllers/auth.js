/* eslint-disable no-unused-vars */
const { response } = require('../helpers/response');
const authModel = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {APP_SECRET, APP_EMAIL} = process.env;
const userModel = require('../models/users');
const mail = require('../helpers/mail');


exports.login = async(req, res) =>{
	try{
		let {username, password} = req.body;
		let data = {username, password};
		const resultLogin = await authModel.login(data);
		const result = await bcrypt.compare(data.password, resultLogin[0].password);
		if (result){
			data = { id : resultLogin[0].id};
			const token = jwt.sign(data, APP_SECRET);
			response(res,'login successfully',[token]);
		} else {
			response(res, 'Cek your username, email, and password',null,null,400);
		}	
	} catch (err) {
		response(res, 'Unexpected error', err, null, 500);
	}
};

exports.verify = async(req, res)=>{
	const auth = req.headers.authorization;
	if (auth.startsWith('Bearer')){
		const token = auth.split(' ')[1];
		if(token){
			try{
				if(jwt.verify(token,APP_SECRET)){
					response(res, 'User verified!');
				} else{
					response(res, 'user not verified', null, null, 403);
				}
			} catch(err){
				response(res, 'user not verified', null, null, 403);
			}
		}
	}
};

exports.forgotRequest = async(req, res)=>{	
	try{
		const { email, code, password, confirmPassword } = req.body;
		if(!code){
			const user = await userModel.getUserByEmailAsync(email);
			const isExpired = await authModel.getRequest(user[0].id);
			console.log(isExpired);
			if(isExpired.length > 0){
				response(res, 'code has been sent to your email');
			} else{
				if(user.length === 1){
					const randomCode = Math.round(Math.random() * 1000000);
					console.log(user[0].id);
					const reset = await authModel.createRequest(user[0].id, randomCode);
					if(reset.affectedRows >= 1){
						const info = await mail.sendMail({
							from: APP_EMAIL,
							to: email,
							subject: 'Reset Your Password | Backend Beginner',
							text: String(randomCode),
							html : `<b> ${randomCode} </b>`
						});
						console.log(info.messageId);
						response(res, 'Forgot password request has been sent to your email');
					} else{
						response(res, 'Unexpected error', null, null, 500);
					}
				} else{
					response(res, 'cek your email', null, null, 404);
				}
			}
		} else{
			if( password && confirmPassword){
				if(password == confirmPassword){
					const user = await authModel.getRequest(code);
					if(user.length > 0 ){
						if(user[0].isExpired == 0){
							const salt = await bcrypt.genSalt(10);
							const hash = await bcrypt.hash(password,salt);
							await authModel.patchRequest(user[0].userId);
							const update = await userModel.patchUserAsyn(user[0].userId,{ password : hash});
							if(update.affectedRows > 0 ){
								response(res, 'Update succesfully');
							} else{
								response(res, 'Updated failed', null, null, 500);
							}
						} else{
							response(res, 'Code expired',null,null,400);
						}
						
					} else {
						response(res,'Code invalid',null,null,400);
					}
				} else {
					response(res, 'password and confirm password must be same');
				}
			} else{
				response(res, 'password and confirm password mandatory', null, null, 400);
			}
		}
	} catch (err){
		response(res, err.message, null,null,500);
	}
	
};