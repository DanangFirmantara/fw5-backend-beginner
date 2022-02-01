/* eslint-disable no-unused-vars */
const usersModel = require('../models/users');

// error handling success
const getUsers = (req, res) =>{
	let {username, id} = req.query;
	username = username || '';
	id = parseInt(id) || '';
	let data = {id, username};
	usersModel.getUsers (data, results =>{
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
		console.log(result.length);
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
	let {username, email, contact} = req.query;
	let data = {
		fullName : req.body.fullName,
		gender : req.body.gender,
		email : req.body.email,
		address : req.body.address,
		contact : req.body.contact,
		displayName : req.body.displayName,
		birthDate : req.body.birthDate
	};
	username = username || '';
	email = email || '';
	contact = contact || '';
	let datas = {username, email, contact};
	usersModel.searchUser(datas, result=>{
		console.log(result.length);
		if(result.length > 0){
			usersModel.patchUser(result[0].id , data, results =>{
				return res.send({
					success : true,
					message : 'Data has been updated',
					results : {id : result[0].id , data}
				});
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