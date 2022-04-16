/* eslint-disable no-unused-vars */
const vehicleModel = require('../models/vehicles');
const helper = require('../helpers/helper');
const {APP_URL} = process.env;
const upload = require('../helpers/upload').single('image');
const fs = require('fs');
const { response } = require('../helpers/response');
const { dinamisUrl } = require('../helpers/dinamisUrl');
const locationModel = require('../models/location');
const { responseHandler } = require('../helpers/responseHandler');
const categoryModel = require('../models/category');
const { deleteFile } = require('../helpers/fileHandler');
const { cloudPathToFileName } = require('../helpers/converter');
const { pageInfo } = require('../helpers/pageInfo');

// get vehicles succes error handling
// check update
const getVehicles = async(req,res) =>{
	const route = 'vehicles';
	let {name,id, idLocation, page, limit, orderBy, sortType} = req.query;
	let validate = {id, page, limit};
	let url = dinamisUrl(req.query);
	const err = helper.validationInt(validate);
	if (err.length <= 0){
		name = name || '';
		id = parseInt(id) || '';
		idLocation = idLocation || '';
		page = parseInt(page) || 1;
		limit = parseInt(limit) || 4;
		orderBy = orderBy || 'name';
		sortType = sortType || 'ASC';
		let offset = ( page-1 ) *limit;
		let data = {name, id, idLocation, offset, limit, orderBy, sortType};
		try {
			const results = await vehicleModel.getVehiclesAsyn(data);
			if(results.length > 0){
				const count = await vehicleModel.countVehiclesAsyn(data);
				const { total } = count[0];
				const url = dinamisUrl(req.query);
				const route = 'vehicles';
				const _pageInfo = pageInfo(total,limit, page, url, route);
				return responseHandler(res, 200, 'List vehicles', results,null, _pageInfo );
				// return response(res, 'List vehicles new', results,{limit, total, page, url,route});
			} else {
				return response (res,'Data not found',null,null, 404);
			}
		}
		catch(err) {
			return response(res,'Unexpected input', err,null,500);
		}
	} else {
		return response (res,'Bad request',err,null, 400);
	}
};

// error handling success except 1 condition when the id is null
const deleteVehicle = async(req,res)=>{
	let {id} = req.query;
	let validate = {id};
	let err = helper.validationInt(validate);
	if(err.length <= 0 ){
		id = parseInt(id) || 0;
		const result = await vehicleModel.getVehicleAsyn(id);
		if (result.length > 0){
			const results = await vehicleModel.deleteVehicleAsyn(id);
			fs.rm(result[0].image, { rescursive:false}, err =>{
				if(err){
					response(res, 'Data not found', err, null, 500);
				}
				response(res,'Deleted successfully', result);
				
			});
		} else {
			response(res, 'Data not found', null, null, 404);
		}
	} else {
		response(res, 'Bad request', err, null, 400);
	}
	
};

const postVehicle = async(req,res) =>{
	try{
		let {name, idLocation, description, price, stock, idCategory} = req.body;
		console.log(req.body);
		if(req.file){
			console.log(req.file);
		}
		let validate = {price, stock};
		let err = helper.validationInt(validate);
		if(err.length <= 0){
			let data = {};
			const fillable = ['name', 'idLocation', 'description', 'price', 'stock', 'idCategory'];
			fillable.forEach(obj =>{
				if(req.body[obj]){
					data[obj] = req.body[obj];
				}
			});
			if (req.file) {
				data.image = req.file.path;
			}
			if(data.stock > 0){
				data.status = 'Available';
			} else{
				data.status = 'Full Booked';
			}
			const location = await locationModel.getLocation(idLocation);
			if(location.length !== 1){
				if (req.file) {
					deleteFile(req.file.filename);
				}
				return responseHandler(res, 404, 'id Location not found');
			}
			const category = await categoryModel.getCategory(idCategory);
			if(category.length !== 1){
				if (req.file) {
					deleteFile(req.file.filename);
				}
				return responseHandler(res, 404, 'Id Category not found');
			}
			const results = await vehicleModel.searchVehiclesAsyn(data);
			if (results.length === 0){
				const result = await vehicleModel.postVehicleAsyn(data);
				const final = await vehicleModel.getVehicleAsyn (result.insertId);
				return responseHandler(res, 200, 'Insert successfully', final);
			} else {
				if (req.file) {
					deleteFile(req.file.filename);
				}
				return responseHandler(res, 400, 'insert failed. name and location has been input');	
			}
		} else {
			if (req.file) {
				deleteFile(req.file.filename);
			}
			return response(res, 'Bad request', err, null, 400);
		}
	} catch (err){
		if (req.file) {
			deleteFile(req.file.filename);
		}
		return response(res, 'Unexpected error', err, null, 500);
	}
};

//update success handling error
const patchVehicle = async(req,res) =>{
	try{
		let {id} = req.query;
		let {name, idLocation, description, price, stock, image, idCategory} = req.body;
		let validate = {id, price, stock};
		let err = helper.validationInt(validate);
		let data = {};
		let fillable = ['name', 'idLocation', 'description', 'price', 'stock','idCategory'];
		fillable.forEach(o =>{
			if(req.body[o]){
				data[o] = req.body[o];
			}
		});
		if (req.file) {
			data.image = req.file.path;
		}
		if(data.stock){
			if(data.stock> 0){
				data.status = 'Available';
			} else{
				data.status = 'Full Booked';
			}
		}
		if (err.length <= 0){
			id = parseInt(id) || 0;
			const results = await vehicleModel.getVehicleAsyn(id);
			if (results.length === 1){
				const result = await vehicleModel.searchVehiclesAsyn(data);
				if (result.length < 2){
					console.log(results[0]);
					if(results[0].image){
						const filename = cloudPathToFileName(results[0].image);
						deleteFile(filename);
					}
					await vehicleModel.patchVehicleAsyn(id, data);
					const final = await vehicleModel.getVehicleAsyn (id);
					return responseHandler(res, 200, 'Data has been update', final);
				} else {
					if (req.file) {
						deleteFile(req.file.filename);
					}	
					return responseHandler(res, 400, 'Updated failed, name and location has been input');
				}
			} else {
				if (req.file) {
					deleteFile(req.file.filename);
				}
				return responseHandler(res, 404, 'Data not found');
			}
		} else {
			if (req.file) {
				deleteFile(req.file.filename);
			}
			return responseHandler(res, 'Bad request', null, err);
		}
	} catch(err){
		if (req.file) {
			deleteFile(req.file.filename);
		}
		console.log(err);
		return responseHandler(res, 500, 'Unexpected error', null, err);
	}
};


module.exports = {getVehicles, deleteVehicle, postVehicle, patchVehicle};