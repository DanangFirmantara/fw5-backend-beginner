/* eslint-disable no-unused-vars */
const usersModel = require('../models/users');
const users = require('../routes/users');

const getUsers = (req, res) =>{
	usersModel.getUsers (results =>{
		return res.json({
			success : true,
			message : 'List of users',
			results : results
		});
	});
};

const getUser = (req, res) =>{
	const {id} = req.params;
	usersModel.getUser(id, results =>{
		return res.json({
			success : true,
			message : 'Data found',
			results : results[0]
		});
	});
};

const postUsers = (req, res)=>{
	let data = {
		fullName : req.body.fullName,
		gender : req.body.gender,
		email : req.body.email,
		address : req.body.address,
		contact : req.body.contact,
		displayName : req.body.displayName,
		birtDate : req.body.birtDate
	};
	usersModel.postUser(data, (results) =>{
		return res.json({
			success : true,
			message : 'users has been inserted'
		});
	});
};

const deleteUser = (req, res)=>{
	const {id} = req.params;

	usersModel.deleteUser(id, results =>{
		if(results == null){
			return res.status(404).json({
				success : false,
				message : 'Delete Error'
			});
		} 
	});

	return res.json({
		success : true,
		message : 'Data has been deleted'
	});
};

module.exports = {getUsers, getUser, postUsers, deleteUser};