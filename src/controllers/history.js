const historyModel = require ('../models/history');
const usersModel = require ('../models/users');
const vehicleModel = require ('../models/vehicles');
const helper = require('../helpers/helper');
const { response } = require('../helpers/response');
const { dinamisUrl } = require('../helpers/dinamisUrl');

const getHistory = async(req, res) =>{
	try{
		let {id,page, limit, orderBy, sortType} = req.query;
		let validate = {id, page, limit};
		const url = dinamisUrl(req.query);
		let err = helper.validationInt(validate);
		if (err <= 0){
			id = parseInt(id) || '';
			page = parseInt(page) || 1;
			limit = parseInt(limit) || 5;
			let offset = ( page - 1 ) * limit;
			orderBy = orderBy || 'id';
			sortType = sortType || 'ASC';
			let data = {id, limit, offset, orderBy, sortType};
			const results = await historyModel.getHistoriesAsync(data);
			if(results.length > 0){
				const count = await historyModel.countHistoryAsync(data);
				let {total} = count[0];
				response(res, 'List of histories', results, {page, limit, url, route:'history', total});
			} else {
				response(res, 'Data not found',null, null, 404);
			}
		} else {
			response(res, 'Bad request', err, null, 400);
		}
	} catch(err){
		response(res, 'Unexpected error', err, null, 500);
	}
};

const getHistoryUser = async(req, res)=>{
	try{
		let {page, limit, orderBy,userId, sortType} = req.query;
		let validate = {userId,page, limit};
		let err = helper.validationInt(validate);
		const url = dinamisUrl(req.query);
		if(err.length == 0){
			userId = userId|| 0;
			page = parseInt(page) || 1;
			limit = limit || 5;
			sortType = sortType || 'ASC';
			orderBy = orderBy || 'vehicleId';
			const offset = ( page - 1 ) * limit; 
			const data = {offset, limit, orderBy, userId, sortType};
			const results = await historyModel.getHistoryUserAsync(data);
			if(results.length > 0){
				const count = await historyModel.countHistoryUserAsync(data);
				const {total} = count[0];
				response(res, 'List of history user', results,{total, limit, page, route:'history/user', url});
			} else {
				response(res, 'Data not found',null, null, 404);
			}
		} else{
			response(res, 'Bad request', err,null,400);
		}		
	} catch(err){
		response(res, 'Unexpected error', err, null, 500);
	}
	
};

//postHistory completed with handling error
const postHistory = async(req, res) =>{
	try{
		let {rentStartDate, rentEndDate, prepayment, userId, vehicleId, quantity} = req.body;
		let validate = {prepayment, userId, vehicleId, quantity};
		let err = helper.validationInt(validate);
		if (err.length <= 0){
			let data = {rentStartDate, rentEndDate, prepayment, userId, vehicleId, quantity};
			const resultU = await usersModel.getUserAsync(userId);
			if (resultU.length > 0){
				const resultV = await vehicleModel.getVehicleAsyn(vehicleId);
				if(resultV.length > 0) {
					if(parseInt(data.quantity) <= resultV[0].stock){
						const results = await historyModel.postHistoryAsync(data);
						const final = await historyModel.getHistoryAsync(results.insertId);
						response(res, 'Inserted history successfully', final);
					} else if (resultV[0].stock > 0) {
						response(res, `Sorry our stock just ${resultV[0].stock} left`, null, null, 400);
					} else {
						response(res, 'Vehicle full booked', null, null, 400);
					}
				} else {
					response(res, 'Data vehicleId not found',null,null,404);
				}
			} else {
				return res.status(404).send({
					success : false,
					message : 'Data userId not found'
				});
			}
	
		} else {
			response(res, 'Bad request', err, null, 400);
		}
	} catch (err){
		response(res,'Unexpected error', err, null, 500);
	}
	
};

const deleteHistory = async(req, res) =>{
	try{
		let {id} = req.query;
		let validate = {id};
		let err = helper.validationInt(validate);
		if (err.length <= 0){
			id = parseInt(id) || 0;
			const result = await historyModel.getHistoryAsync(id);
			if (result.length > 0){
				await historyModel.deleteHistoryAsync(id);
				response(res, 'Deleted Succesfully', result);
			} else {
				response(res, 'Data not found', null, null, 404);
			}
		} else {
			response(res, 'Bad Request', err,null,400);
		}
	} catch (err){
		response(res, 'Unexpected error', err, null, 500);
	}
	
	
};

const patchHistory = async(req, res) =>{
	try{
		let {quantity} = req.body;
		let {id} = req.query;
		let validate = {id, quantity};
		let err = helper.validationInt(validate);
		if (err.length <= 0){
			id = parseInt(id) || 0 ;
			let data = {id, quantity};
			const result = await historyModel.getHistoryAsync(id);
			if(result.length > 0){
				if (result[0].quantity > parseInt(quantity)){
					await historyModel.patchHistoryAsync(data);
					const final = await historyModel.getHistoryAsync(id);
					response(res, 'Updated successfully', final);
				}else {
					response(res, 'You prohibited update your data. Bad request', null, null, 400);
				}
		
			} else {
				return res.status(404).send({
					success : false,
					message : 'Data not found'
				});
			}
		} else {
			return res.status(400).send({
				success : false,
				message : 'Bad request',
				error : err
			});
		}
	} catch (err){
		response(res, 'Unexpected error', err, null, 500);
	}
};

module.exports = {getHistory, getHistoryUser, postHistory, deleteHistory, patchHistory};