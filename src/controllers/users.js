/* eslint-disable no-unused-vars */
const usersModel = require('../models/users');
const helper = require('../helpers/helper');

// error handling success
const getUsers = (req, res) =>{
	let {username, id, page, limit, orderBy, sortType} = req.query;
	let validate = {id, page, limit};
	let err = helper.validationInt(validate);
	if (err.length <= 0){
		page = parseInt(page) || 1;
		limit = parseInt(limit) || 5;
		let offset = ( page - 1 ) * 5;
		username = username || '';
		id = parseInt(id) || '';
		let data = {id, username, offset, limit};
		usersModel.getUsers (data, results =>{
			if (results.length > 0){
				usersModel.countUser(data, count=>{
					let {total} = count[0];
					let last = Math.ceil(total/limit);
					return res.json({
						success : true,
						message : 'List of users',
						results : results,
						pageInfo : {
							prev : page > 1 ? `http://localhost:5000/users/?page=${page-1}` : null,
							next : page < last ? `http://localhost:5000/users/?page=${page+1}` : null,
							totalData : total,
							lastPage : last
						}
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
// postuser has been updated. handling error completed
// hanya bisa melakukan sign up
const postUsers = (req, res)=>{
	let data = {
		username : req.body.username,
		contact : req.body.contact,
		email : req.body.email,
		password : req.body.password
	};
	usersModel.searchUser(data, result =>{
		if(result.length <= 0){
			usersModel.postUser(data, results=>{
				return res.send({
					success : true,
					message : 'insert successfully',
					results : {id : results.insertId, data}
				});
			});
		} else {
			return res.status(400).send({
				success : false,
				message : 'Insert failed'
			});
		}
	});
};

const deleteUser = (req, res)=>{
	let {id} = req.query;
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
};

//update handling error completed.
const patchUser = (req, res) =>{
	let {id} = req.query;
	let data = {
		fullName : req.body.fullName,
		gender : req.body.gender,
		email : req.body.email,
		address : req.body.address,
		contact : req.body.contact,
		displayName : req.body.displayName,
		birthDate : req.body.birthDate,
		username : req.body.username
	};
	id = parseInt(id) || 0;
	usersModel.getUser(id, result=>{
		if(result.length > 0){
			usersModel.searchUser(data, resultS =>{
				if(resultS[0].id == id){
					usersModel.patchUser(id, data, results =>{
						return res.send({
							success : true,
							message : 'Data has been updated',
							results : {id : result[0].id , data}
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
	})
	;
};
module.exports = {getUsers, postUsers, deleteUser, patchUser};