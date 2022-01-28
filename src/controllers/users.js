const usersModel = require('../models/users');

const getUsers = (req, res) =>{
	usersModel.getUsers (results =>{
		return res.json({
			success : true,
			message : 'List of users',
			results : results
		});
	});
};

module.exports = {getUsers};