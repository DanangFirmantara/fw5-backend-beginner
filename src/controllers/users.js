/* eslint-disable no-unused-vars */
const usersModel = require('../models/users');
const helper = require('../helpers/helper');
const { response } = require('../helpers/response');
const bcrypt = require('bcrypt');

// error handling success
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

// postuser has been updated. handling error completed
// hanya bisa melakukan sign up
// disni akan ada make password dan create hash for secure
// input email, contact, dan password
const postUsers = async(req, res)=>{
	try{
		let {username, contact, email, password} = req.body;
		let fillable = ['username', 'contact', 'email', 'password'];
		fillable.forEach(obj => {
			if(!req.body[obj]){
				response(res, 'Bad request. username, contact, email, password must be fill', null, null, 400);
			}
		});
		const saltRounds = 10;
		password = await bcrypt.hash(password, saltRounds);
		let data = {username, contact, email, password}; 
		const result = await usersModel.searchUserAsyn(data);
		if(result.length <= 0){
			const results = await usersModel.postUserAsyn(data);
			const final = await usersModel.getUserAsyn(results.insertId);
			response(res, 'Inserted successfully', final);
		} else {
			response(res, 'Insert failed. Data has been input');
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
				return res.status(404).send({
					success : false,
					message : 'Data not found'
				});
			}
		} else {
			response(res, 'Bad request', err, null, 400);
		}
	} catch (err) {	
		response(res, 'Unexpected error', err, null, 500);
	}
};

//update handling error completed.
const patchUser = async(req, res) =>{
	try{
		let {id} = req.query;
		let validate = {id};
		let err = helper.validationInt(validate);
		if (err.length <= 0){
			let {fullName, gender, email, address, contact, displayName, birthDate, username} = req.body;
			let data = {};
			let fillable = ['fullName', 'gender', 'email', 'address', 'contact', 'displayName', 'birthDate', 'username'];
			fillable.forEach(obj =>{
				if(req.body[obj]){
					data[obj] = req.body[obj];
				}
			});
			id = parseInt(id) || 0;
			const result = await usersModel.getUserAsyn(id);
			if(result.length > 0){
				const resultS = await usersModel.searchUserAsyn(data);
				if(resultS[0].id == id){
					const results = await usersModel.patchUserAsyn(id, data);
					const final = await usersModel.getUserAsyn(id);
					response(res, 'Data has been updated', final);
				} else {
					response(res, 'Bad request. Cek your id, username and email', null, null, 400);
					
				}
			} else {
				response(res, 'Data not found');
			}
			
		} else {
			response(res, 'Bad request', err, null, 400);
			
		}
	}catch (err) {
		response(res, 'Unexpected error', err, null, 500);
	}
	
	
};
module.exports = {getUsers, postUsers, deleteUser, patchUser};