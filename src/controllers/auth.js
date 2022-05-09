/* eslint-disable no-unused-vars */
const { response } = require('../helpers/response');
const authModel = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {APP_SECRET, APP_EMAIL, APP_FRONTEND_URL} = process.env;
const userModel = require('../models/users');
const mail = require('../helpers/mail');
const { responseHandler } = require('../helpers/responseHandler');
const { code } = require('../helpers/bookedCode');


exports.login = async(req, res) =>{
	try{
		let {username, password} = req.body;
		let data = {username, password};
		const resultLogin = await authModel.login(data);
		const result = await bcrypt.compare(data.password, resultLogin[0].password);
		if (result){
			data = { id : resultLogin[0].id};
			const token = jwt.sign(data, APP_SECRET);
			return response(res,'login successfully',[token]);
		} else {
			return response(res, 'Cek your username, email, and password',null,null,400);
		}	
	} catch (err) {
		return response(res, 'Cek your username, email, and password',null,null,400);
	}
};

exports.verify = async(req, res)=>{
	const auth = req.headers.authorization;
	if (auth.startsWith('Bearer')){
		const token = auth.split(' ')[1];
		if(token){
			try{
				const data = jwt.verify(token, APP_SECRET);
				if(data){
					req.userData = data;
					return response(res, 'user verified');
				} else{
					return response(res,'user not verified',null, null, 403);
				}
			} catch(err){
				return response(res, 'user not verified', null, null, 403);
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
			if(isExpired.length > 0){
				return response(res, 'code has been sent to your email');
			} else{
				if(user.length === 1){
					const randomCode = Math.round(Math.random() * 1000000);
					const reset = await authModel.createRequest(user[0].id, randomCode);
					if(reset.affectedRows >= 1){
						const info = await mail.sendMail({
							from: APP_EMAIL,
							to: email,
							subject: 'Reset Your Password | Backend Beginner',
							text: String(randomCode),
							html : ` your code OTP is <b>${randomCode}</b> click <a href='${APP_FRONTEND_URL}/resetPassword'>link</a> to reset your password`
						});
						return response(res, 'Forgot password request has been sent to your email');
					} else{
						return response(res, 'Unexpected error', null, null, 500);
					}
				} else{
					return response(res, 'cek your email', null, null, 404);
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
								return response(res, 'Your password has been reset');
							} else{
								return response(res, 'Updated failed', null, null, 500);
							}
						} else{
							return response(res, 'Code expired',null,null,400);
						}
						
					} else {
						return response(res,'Code invalid',null,null,400);
					}
				} else {
					return response(res, 'password and confirm password must be same');
				}
			} else{
				return response(res, 'password and confirm password mandatory', null, null, 400);
			}
		}
	} catch (err){
		return response(res, err.message, null,null,500);
	}
	
};

exports.userVerify = async(req, res)=>{
	try{
		const {id} = req.userData;
		const {otp} = req.body;
		const user = await userModel.getVerifyCode(id);
		if(user.length === 0) {
			return responseHandler(res, 404, 'Data not found' );
		}
		if(user[0].verifyCode !== parseInt(otp)){
			return responseHandler(res, 400, 'Cek your otp');
		}
		await userModel.verifyUser(id);
		const userUpdate = await userModel.getUserAsyn(id);
		return responseHandler(res, 200, 'User verified', userUpdate);
	} catch(err){
		return responseHandler(res, 500, 'Unexpected error', null, err);
	}
};

exports.requestVerify = async(req, res) =>{
	try{
		const {id} = req.userData;
		console.log(id);
		const user = await userModel.getUserAsyn(id);
		console.log(user[0]);
		if(user.length === 0){
			return responseHandler(res, 404, 'data not found');
		}
		const otp = code();
		console.log(otp);
		const updateUser = await userModel.updateVerifyCode(id, otp);
		if(updateUser.affectedRows >= 1){
			const info = await mail.sendMail({
				from: APP_EMAIL,
				to: user[0].email,
				subject: 'Verify your account | Backend Beginner',
				text: String(otp),
				html : ` your code OTP is <b>${otp}</b> click <a href='${APP_FRONTEND_URL}/verifyAccount'>link</a> to verify your account`
			});
			return responseHandler(res, 200, 'Code has been sent to your email');
		} else{
			return responseHandler(res, 500, 'unexpected error');
		}
	} catch(err){
		return responseHandler(res, 500, 'Unexpected error' );
	}
};