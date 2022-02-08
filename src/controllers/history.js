/* eslint-disable no-unused-vars */
const historyModel = require ('../models/history');
const usersModel = require ('../models/users');
const vehicleModel = require ('../models/vehicles');
const helper = require('../helpers/helper');

const getHistory = (req, res) =>{
	let {id,page, limit, orderBy, sortType} = req.query;
	let validate = {id, page, limit};
	let err = helper.validationInt(validate);
	if (err <= 0){
		id = parseInt(id) || '';
		page = parseInt(page) || 1;
		limit = parseInt(limit) || 5;
		let offset = ( page - 1 ) * limit;
		orderBy = orderBy || 'id';
		sortType = sortType || 'ASC';
		let data = {id, limit, offset, orderBy, sortType};
		historyModel.getHistories(data, results=>{
			if(results.length > 0){
				historyModel.countHistory(data, count =>{
					let {total} = count[0];
					let last = Math.ceil(total/limit);
					return res.send({
						success : true,
						message : 'List of histories',
						results : results,
						pageInfo : {
							prev : page > 1 ? `http://localhost:5000/history/?page=${page-1}` : null,
							next : page < last ? `http://localhost:5000/history/?page=${page+1}` : null,
							total : total,
							currentPage : page,
							lastPage : last
						}
					});
				});
			} else {
				return res.status(404).send({
					success : false,
					message : 'Data not found',
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

//postHistory completed with handling error
const postHistory = (req, res) =>{
	let {rentStartDate, rentEndDate, prepayment, userId, vehicleId, quantity} = req.body;
	let validate = {prepayment, userId, vehicleId, quantity};
	let err = helper.validationInt(validate);
	if (err.length <= 0){
		let data = {rentStartDate, rentEndDate, prepayment, userId, vehicleId, quantity};
		usersModel.getUser(userId, resultU =>{
			if (resultU.length > 0){
				vehicleModel.getVehicle(vehicleId, resultV =>{
					if(resultV.length > 0) {
						if(parseInt(data.quantity) <= resultV[0].stock){
							historyModel.postHistory(data, results =>{
								historyModel.getHistory(results.insertId, final =>{
									return res.send({
										success : true,
										message : 'Insert history successfully',
										results : final[0]
									});
								});
							});
						} else if (resultV[0].stock > 0) {
							return res.status(400).send({
								success : false,
								message : `Sorry our stock just ${resultV[0].stock} left`
							});
						} else {
							return res.status(400).send({
								success : false,
								message : 'Vehicle full booked'
							});
						}
					} else {
						return res.status(404).send({
							success : false,
							message : 'Data vehicleId not found'
						});
					}
				});
			} else {
				return res.status(404).send({
					success : false,
					message : 'Data userId not found'
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

const deleteHistory = (req, res) =>{
	let {id} = req.query;
	let validate = {id};
	let err = helper.validationInt(validate);
	if (err.length <= 0){
		id = parseInt(id) || 0;
		historyModel.getHistory(id, result =>{
			if (result.length > 0){
				historyModel.deleteHistory(id, results =>{
					return res.send({
						success : true,
						message : 'Deleted successfully',
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

const patchHistory = (req, res) =>{
	let {quantity} = req.body;
	let {id} = req.query;
	let validate = {id, quantity};
	let err = helper.validationInt(validate);
	if (err.length <= 0){
		id = parseInt(id) || 0 ;
		let data = {id, quantity};
		historyModel.getHistory(id, result =>{
			if(result.length > 0){
				if (result[0].quantity > parseInt(quantity)){
					historyModel.patchHistory(data, result =>{
						historyModel.getHistory(id, final =>{
							return res.send({
								success : true,
								message : 'Updated successfully',
								results : final[0]
							});
						});
					});
				}else {
					return res.status(400).send({
						success : false,
						message : 'You prohibited update your data. Bad request'
					});
				}
			
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

module.exports = {getHistory, postHistory, deleteHistory, patchHistory};