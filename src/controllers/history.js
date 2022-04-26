const historyModel = require ('../models/history');
const usersModel = require ('../models/users');
const vehicleModel = require ('../models/vehicles');
const helper = require('../helpers/helper');
const { response } = require('../helpers/response');
const { dinamisUrl } = require('../helpers/dinamisUrl');
const reservationModel = require('../models/reservation');
const { payment } = require('../helpers/bookedCode');
const { responseHandler } = require('../helpers/responseHandler');
const { pageInfo } = require('../helpers/pageInfo');

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
		console.log('kok gini');
		let {page, limit, orderBy, sortType} = req.query;
		let userId = req.userData.id;
		let validate = {page, limit};
		let err = helper.validationInt(validate);
		const url = dinamisUrl(req.query);
		console.log(req.userData);
		if(err.length === 0){
			userId = userId || 0;
			page = parseInt(page) || 1;
			limit = limit || 5;
			sortType = sortType || 'ASC';
			orderBy = orderBy || 'vehicleId';
			const offset = ( page - 1 ) * limit; 
			const data = {offset, limit, orderBy, userId, sortType};
			console.log(data);
			const results = await historyModel.getHistoryUserAsync(data);
			if(results.length !== 0){
				const count = await historyModel.countHistoryUserAsync(data);
				const {total} = count[0];
				const route = 'vehicles';
				const _pageInfo = pageInfo(total,limit, page, url, route);
				return responseHandler(res, 200, 'List vehicles', results,null, _pageInfo );
			} else {
				return responseHandler(res, 404, 'Data not found cekk bro');
			}
		} else{
			return responseHandler(res, 400,'Bad request',null, err);
		}		
	} catch(err){
		return response(res, 'Unexpected error', err, null, 500);
	}
	
};

//postHistory completed with handling error
const postHistory = async(req, res) =>{
	try{
		let {rentStartDate, rentEndDate, vehicleId, quantity, idReservation} = req.body;
		let validate =  {vehicleId, quantity, idReservation};
		const diffInMs   = new Date(rentEndDate) - new Date(rentStartDate);
		const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
		const vehicle = await vehicleModel.getVehicleAsyn(vehicleId);
		if( vehicle.length !== 1){
			return response(res, 'vehicle Id not found', null,null,  404);
		}
		const total = parseInt(diffInDays) * vehicle[0].price * parseInt(quantity);
		const codePayment = payment();
		const userId = req.userData.id;
		let err = helper.validationInt(validate);
		if (err.length <= 0){
			let data = {rentStartDate, rentEndDate, userId, vehicleId, quantity, idReservation, codePayment, total};
			const reservation = await reservationModel.getReservation(idReservation);
			if(reservation.length !== 1){
				return response(res, 'id Reservation not found',null,null, 404);
			}
			const resultU = await usersModel.getUserAsync(userId);
			if (resultU.length > 0){
				const resultV = await vehicleModel.getVehicleAsyn(vehicleId);
				if(resultV.length > 0) {
					if(parseInt(data.quantity) <= resultV[0].stock){
						const stock = resultV[0].stock - parseInt(data.quantity);
						if(stock === 0){
							await vehicleModel.patchVehicleAsyn(vehicleId, {stock:stock, status:'full booked'});
						}else{
							await vehicleModel.patchVehicleAsyn(vehicleId, {stock:stock, status:'Available'});
						}
						const results = await historyModel.postHistoryAsync(data);
						const final = await historyModel.getHistoryAsync(results.insertId);
						return responseHandler(res, 200, 'Inserted history successfully', final );
					} else if (resultV[0].stock > 0) {
						return responseHandler(res, 400, `Sorry our stock just ${resultV[0].stock} left`);
					} else {
						return responseHandler(res, 400, 'Vehicle full booked');
					}
				} else {
					return responseHandler(res, 404, 'Data not found');
				}
			} else {
				return responseHandler(res, 404, 'Data userId not found');
			}
	
		} else {
			return responseHandler(res, 400, 'Bad request');
		}
	} catch (err){
		return responseHandler(res, 500, 'Unexpected error', null, err);
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
				const vehicle = await vehicleModel.getVehicleAsyn(result[0].vehicleId);
				const stock = result[0].quantity + vehicle[0].stock;
				const data = {stock: stock, status: 'Available'};
				await vehicleModel.patchVehicleAsyn(id, data);
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
					const vehicle = await vehicleModel.getVehicleAsyn(result[0].vehicleId);
					const stock = result[0].quantity + vehicle[0].stock - parseInt(quantity);
					await vehicleModel.patchVehicleAsyn(result[0].vehicleId, {stock: stock, status : 'Available'});
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

const finishPayment = async(req, res)=>{
	try{
		const {id, total, codePayment} = req.body;
		const history = await historyModel.getHistoryAsync(id);
		if(history.length === 0 ){
			return response(res, 'history not found');
		}
		console.log(parseInt(codePayment) !== history[0].codePayment);
		if(parseInt(codePayment) !== history[0].codePayment){
			return response(res, 'Check your payment code', null, null, 400);
		}
		if(parseInt(total) !== history[0].total){
			return response(res,`you should pay ${history[0].total}`, null, null, 400);
		}
		await historyModel.finishPayment(codePayment);
		const result = await historyModel.getHistoryAsync(id);
		return responseHandler(res, 200, 'Payment success!', result);
	} catch(err){
		return response(res, 'Unexpected error', err, null, 500);
	}
};

const getHistoryById = async(req,res) =>{
	try{
		const {id} = req.params;
		const history = await historyModel.getHistoryAsync(id);
		if(history.length === 0){
			return responseHandler(res, 404, 'Data not found');
		}
		return responseHandler(res, 200, 'Detail history', history);
	} catch(err){
		return responseHandler(res, 500, 'Unexpected error', null, err);
	}
};

module.exports = {getHistory, getHistoryUser, postHistory, deleteHistory, patchHistory, finishPayment, getHistoryById};