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
	return res.json({
		success : true,
		message : 'Users has been inserted'
	});
};

module.exports = {getUsers, getUser, postUsers};