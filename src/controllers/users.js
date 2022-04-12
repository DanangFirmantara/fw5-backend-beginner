/* eslint-disable no-unused-vars */
const usersModel = require('../models/users');
const helper = require('../helpers/helper');
const { response } = require('../helpers/response');
const bcrypt = require('bcrypt');
const { deleteFile } = require('../helpers/fileHandler');
const { cloudPathToFileName } = require('../helpers/converter');
const { responseHandler } = require('../helpers/responseHandler');

const getUsers = async(req, res) =>{
	try {
		let {username, id, page, limit, orderBy, sortType} = req.query;
		let validate = {id, page, limit};
		let err = helper.validationInt(validate);
		if (err.length <= 0){
			page = parseInt(page) || 1;
			limit = parseInt(limit) || 5;
			orderBy = orderBy || 'id';
			sortType = sortType || 'ASC';
			let offset = ( page - 1 ) * limit;
			username = username || '';
			id = parseInt(id) || '';
			let data = {id, username, offset, limit, orderBy, sortType};
			const results = await usersModel.getUsersAsyn(data);
			if (results.length > 0){
				const count = await usersModel.countUserAsyn(data);
				let {total} = count[0];
				response(res, 'List of users', results, {limit, total, page});
			} else {
				response(res, 'Data not found', null, null, 404);
			}
		} else {
			response(res, 'Bad request', err, null, 400);
		}
	} catch (err){
		response(res, 'Unexpected error', err, null, 500);
	}
};

const postUsers = async(req, res)=>{
	try{
		let {username, email, password} = req.body;
		let fillable = ['username', 'email', 'password'];
		fillable.forEach(obj => {
			if(!req.body[obj]){
				response(res, 'Bad request. username, contact, email, password must be fill', null, null, 400);
			}
		});
		const saltRounds = 10;
		password = await bcrypt.hash(password, saltRounds);
		let data = {username, email, password}; 
		const result = await usersModel.searchUserAsyn(data);
		if(result.length <= 0){
			const results = await usersModel.postUserAsyn(data);
			const final = await usersModel.getUserAsyn(results.insertId);
			response(res, 'Sign up successfully', final);
		} else {
			response(res, 'Sign up failed. Data has been input',null,null,400);
		}
	} catch(err){
		response(res, 'Unexpected error', err, null, 500);
	}
};

const deleteUser = async(req, res)=>{
	try{
		let {id} = req.query;
		let validate = {id};
		let err = helper.validationInt(validate);
		if (err.length <= 0){
			id = parseInt(id) || 0;
			const result = await usersModel.getUserAsyn(id);
			if(result.length >0){
				await usersModel.deleteUserAsyn(id);
				response(res, 'Deleted successfully', result);
			} else {
				response(res, 'Data not found', null, null, 404);
			}
		} else {
			response(res, 'Bad request', err, null, 400);
		}
	} catch (err) {	
		response(res, 'Unexpected error', err, null, 500);
	}
};

const patchUser = async(req, res) =>{
	try{
		let id = req.userData.id;
		console.log(req.body);
		if(req.file){
			console.log( req.file);
		}
		let {fullName, gender, address, contact, displayName, birthDate, email} = req.body;
		let data = {};
		let fillable = ['fullName', 'gender', 'email', 'address', 'contact', 'displayName', 'birthDate'];
		fillable.forEach(obj =>{
			if(req.body[obj]){
				data[obj] = req.body[obj];
			}
		});
		id = parseInt(id) || 0;
		const result = await usersModel.getUserAsyn(id);
		if(result.length === 1){
			console.log(result[0]);
			if(result[0].image){
				const filename = cloudPathToFileName(result[0].image);
				deleteFile(filename);
			}
			if (req.file) {
				data.image = req.file.path;
			}
			console.log(data);
			await usersModel.patchUserAsyn(id, data);
			const final = await usersModel.getUserAsyn(id);
			return responseHandler(res, 200, 'Data has been updated', final);
			// return response(res, 'Data has been updated', final);
		} else {
			if (req.file) {
				deleteFile(req.file.filename);
			}
			return response(res, 'Data not found',null,null,404);
		}	
	}catch (err) {
		if (req.file) {
			deleteFile(req.file.filename);
		}
		console.log(err);
		return response(res, 'Unexpected error', null, null, 500);
	}
};

const patchUserEditPassword = async(req,res)=>{
	try{
		const {id} = req.userData;
		const {oldPassword, newPassword, newPasswordConfirm} = req.body;
		const data = {oldPassword, newPassword, newPasswordConfirm};
		const result = await usersModel.getUserEditPasswordAsync(id);
		if(result.length == 1){
			const results = await bcrypt.compare(data.oldPassword, result[0].password);
			if(results){
				if(newPassword == newPasswordConfirm){
					if(newPassword != oldPassword){
						const salt = await bcrypt.genSalt(10);
						const hash = await bcrypt.hash(newPassword,salt);
						const cek = await bcrypt.compare(newPassword, hash);
						await usersModel.patchUserAsyn(id, { password : hash});
						response(res, 'succesfully update password');
					} else{
						response(res, 'Old Password and New password must be difference', null, null, 400);
					}
					
				} else {
					response(res,'New Password and New Password Cofirm must be same', null, null, 400);
				}	
				
			} else {
				response(res, 'Check your old Password', null, null, 400);
			}
			
		} else{
			response(res, 'Data not found', null, null, 404);
		}
		
	} catch(err){
		response(res, 'Unexpected error', null, null, 500);
	}
	
};
module.exports = {getUsers, postUsers, deleteUser, patchUser, patchUserEditPassword};