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
			message : `List user from id ${id}`,
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

module.exports = {getUsers, getUser, postUsers};