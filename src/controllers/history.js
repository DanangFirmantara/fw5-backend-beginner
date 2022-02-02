/* eslint-disable no-unused-vars */
const historyModel = require ('../models/history');
const usersModel = require ('../models/users');
const vehicleModel = require ('../models/vehicles');

const getHistory = (req, res) =>{
	let {id} = req.query;
	id = parseInt(id) || '';
	console.log(id);
	historyModel.getHistories(id, results=>{
		if(results.length > 0){
			return res.send({
				success : true,
				message : 'List of Histories',
				results : results
			});
		} else {
			return res.status(404).send({
				success : false,
				message : 'Data not found',
			});
		}
	});
};

//postHistory completed with handling error
const postHistory = (req, res) =>{
	let {rentStartDate, rentEndDate, prepayment, userId, vehicleId, quantity} = req.body;
	let data = {rentStartDate, rentEndDate, prepayment, userId, vehicleId, quantity};
	usersModel.getUser(userId, resultU =>{
		if (resultU.length > 0){
			vehicleModel.getVehicle(vehicleId, resultV =>{
				if(resultV.length > 0) {
					if(parseInt(data.quantity) <= resultV[0].stock){
						historyModel.postHistory(data, results =>{
							return res.send({
								success : true,
								message : 'Insert history successfully',
								results : {id : results.insertId, data}
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
};

const deleteHistory = (req, res) =>{
	let {id} = req.query;
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
};

const patchHistory = (req, res) =>{
	let {quantity} = req.body;
	let {id} = req.query;
	let data = {id, quantity};
	historyModel.getHistory(id, result =>{
		if(result.length > 0){
			if (result[0].quantity > 0){
				historyModel.patchHistory(data, result =>{
					return res.send({
						success : true,
						message : 'Updated successfully'
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
	
};

module.exports = {getHistory, postHistory, deleteHistory, patchHistory};