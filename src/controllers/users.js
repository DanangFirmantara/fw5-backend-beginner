/* eslint-disable no-unused-vars */
const usersModel = require('../models/users');

// error handling success
const getUsers = (req, res) =>{
	usersModel.getUsers (results =>{
		if (results.length > 0){
			return res.json({
				success : true,
				message : 'List of users',
				results : results
			});
		} else {
			return res.status(404).send({
				success : false,
				message : 'Data not found'
			});
		}	
	});
};

// error handling completed
const getUser = (req, res) =>{
	const {id} = req.params;
	usersModel.getUser(id, results =>{
		if (results.length > 0){
			return res.json({
				success : true,
				message : 'Detail user',
				results : results[0]
			});
		} else {
			return res.status(404).json({
				success : false,
				message : 'Data not found'
			});
		}
	});
};

// postuser has been updated. handling error completed
const postUsers = (req, res)=>{
	let data = {
		fullName : req.body.fullName,
		gender : req.body.gender,
		email : req.body.email,
		address : req.body.address,
		contact : req.body.contact,
		displayName : req.body.displayName,
		birthDate : req.body.birthDate
	};
	usersModel.searchUser(data, result =>{
		if(result.length <= 0){
			usersModel.postUser(data, (results) =>{
				return res.json({
					success : true,
					message : 'users has been inserted',
					results : { id : results.insertId, data }
				});
			});
		} else {
			return res.status(404).send({
				success : false,
				message : 'insert failed'
			});
		}
	});
};

//handling error for delete completed
const deleteUser = (req, res)=>{
	const {id} = req.params;
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
	const {id} = req.params;
	let data = {
		fullName : req.body.fullName,
		gender : req.body.gender,
		email : req.body.email,
		address : req.body.address,
		contact : req.body.contact,
		displayName : req.body.displayName,
		birthDate : req.body.birthDate
	};
	usersModel.getUser(id, result =>{
		if (result.length > 0){
			usersModel.searchUser(data, results =>{
				if (results.length <= 0){
					usersModel.patchUser(id, data, resu =>{
						return res.json({
							success : true,
							message : 'Data has been updated',
							results : {id : id, data}
						});
					});
				} else {
					return res.status(400).send ({
						success : false,
						message : 'Bad Request'
					});
				}
			});
		}else {
			return res.status(404).send({
				success : false,
				message : 'Data not found'
			});
		}
	});
};
module.exports = {getUsers, getUser, postUsers, deleteUser, patchUser};