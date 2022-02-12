/* eslint-disable no-unused-vars */
const usersModel = require('../models/users');
const helper = require('../helpers/helper');
const { response } = require('../helpers/response');

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
const postUsers = (req, res)=>{
	let {username, contact, email, password} = req.body;
	let data = {username, contact, email, password}; 
	usersModel.searchUser(data, result =>{
		if(result.length <= 0){
			usersModel.postUser(data, results=>{
				usersModel.getUser(results.insertId, final =>{
					return res.send({
						success : true,
						message : 'insert successfully',
						results : final[0]
					});
				});
			});
		} else {
			return res.status(400).send({
				success : false,
				message : 'Insert failed. Data has been input'
			});
		}
	});
};

const deleteUser = (req, res)=>{
	let {id} = req.query;
	let validate = {id};
	let err = helper.validationInt(validate);
	if (err.length <= 0){
		id = parseInt(id) || 0;
		usersModel.getUser(id, result=>{
			if(result.length >0){
				usersModel.deleteUser(id, results =>{
					return res.send({
						success : true,
						message : 'Deleted Succesfully',
						results : result[0]
					});
				});
			} else {
				return res.status(404).send({
					success : false,
					message : 'Data not found'
				});
			}
		});
	} else {
		return res.status(400).send({
			success : false,
			message : 'Bad request',
			error : err
		});
	}
};

//update handling error completed.
const patchUser = (req, res) =>{
	let {id} = req.query;
	let validate = {id};
	let err = helper.validationInt(validate);
	if (err.length <= 0){
		let {fullName, gender, email, address, contact, displayName, birthDate, username} = req.body;
		let data = {fullName, gender, email, address, contact, displayName, birthDate, username};
		id = parseInt(id) || 0;
		usersModel.getUser(id, result=>{
			if(result.length > 0){
				usersModel.searchUser(data, resultS =>{
					if(resultS[0].id == id){
						usersModel.patchUser(id, data, results =>{
							usersModel.getUser(id, final =>{
								return res.send({
									success : true,
									message : 'Data has been updated',
									results : final[0]
								});
							});
						});
					} else {
						return res.status(400).send({
							success : false,
							message : 'Bad request. Cek your id, username and email'
						});
					}
				});
			} else {
				return res.status(404).send ({
					success : false,
					message : 'data not found'
				});
			}
		});
	} else {
		return res.status(400).send({
			success : false,
			message : 'Bad request',
			error : err
		});
	}
	
};
module.exports = {getUsers, postUsers, deleteUser, patchUser};