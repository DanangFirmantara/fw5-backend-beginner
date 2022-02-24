/* eslint-disable no-unused-vars */
const vehicleModel = require('../models/vehicles');
const helper = require('../helpers/helper');
const {APP_URL} = process.env;
const upload = require('../helpers/upload').single('image');
const fs = require('fs');
const { response } = require('../helpers/response');
const { dinamisUrl } = require('../helpers/dinamisUrl');

// get vehicles succes error handling
// check update
const getVehicles = async(req,res) =>{
	const route = 'vehicles';
	let {name,id, location, page, limit, orderBy, sortType} = req.query;
	let validate = {id, page, limit};
	let url = dinamisUrl(req.query);
	const err = helper.validationInt(validate);
	if (err.length <= 0){
		name = name || '';
		id = parseInt(id) || '';
		location = location || '';
		page = parseInt(page) || 1;
		limit = parseInt(limit) || 5;
		orderBy = orderBy || 'location';
		sortType = sortType || 'ASC';
		let offset = ( page-1 ) *limit;
		let data = {name, id, location, offset, limit, orderBy, sortType};
		try {
			const results = await vehicleModel.getVehiclesAsyn(data);
			if(results.length > 0){
				const count = await vehicleModel.countVehiclesAsyn(data);
				const { total } = count[0];
				response(res, 'List vehicles new', results,{limit, total, page, url,route});
			} else {
				response (res,'Data not found',null,null, 404);
			}
		}
		catch(err) {
			response(res,'Unexpected input', err,null,500);
		}
	} else {
		response (res,'Bad request',err,null, 400);
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

const postVehicle = (req,res) =>{
	upload(req, res, async err =>{
		try{
			if(err){
				response(res, err.message, null, null, 400);
			} else {
				let {name, location, description, price, status, stock, image, category} = req.body;
				let validate = {price, stock};
				let err = helper.validationInt(validate);
				if(err.length <= 0){
					let data = {};
					const fillable = ['name', 'location', 'description', 'price', 'status', 'stock', 'category'];
					fillable.forEach(obj =>{
						if(req.body[obj]){
							data[obj] = req.body[obj];
						}
					});
					if(req.file){
						data.image = req.file.path.split('\\').join('/');
					}
					const results = await vehicleModel.searchVehiclesAsyn(data);
					if (results.length <= 0){
						const result = await vehicleModel.postVehicleAsyn(data);
						const final = await vehicleModel.getVehicleAsyn (result.insertId);
						response(res, 'Insert succesfully', final);
					} else {
						if(data.image){
							fs.rm(data.image,{ recursive : false }, err =>{
								if (err) {
									response(res, 'Data not found', err, null, 500);
								}
							});
						}
						response(res,'insert failed. name and location has been input', null, null, 400);	
					}
				} else {
					response(res, 'Bad request', err, null, 400);
				}
			}
		} catch (err){
			response(res, 'Unexpected error', err, null, 500);
		}
		
	});
};

//update success handling error
const patchVehicle = (req,res) =>{
	upload(req, res, async err=>{
		if(err){
			response(res, err.message, null,null, 400);
		} else {
			let {id} = req.query;
			let {name, location, description, price, status, stock, image, category} = req.body;
			let validate = {id, price, stock};
			let err = helper.validationInt(validate);
			let data = {};
			let fillable = ['name', 'location', 'description', 'price', 'status', 'stock','category'];
			fillable.forEach(o =>{
				if(req.body[o]){
					data[o] = req.body[o];
				}
			});
			if(req.file){
				console.log();
				data.image = req.file.path.split('\\').join('/');
			}
			if (err.length <= 0){
				id = parseInt(id) || 0;
				try{
					const results = await vehicleModel.getVehicleAsyn(id);
					if (results.length > 0){
						const result = await vehicleModel.searchVehiclesAsyn(data);
						if (result.length > 0){
							if (result[0].id == id){
								fs.rm(results[0].image,{ recursive : true }, async err =>{
									try {
										if (err) {
											response(res, 'File not found', err, null, 500);
										}
										const resultUpdate = await vehicleModel.patchVehicleAsyn(id, data);
										const final = await vehicleModel.getVehicleAsyn (id);
										const processResult = final.map(obj=>{
											if(obj.image !== null){
												obj.image = `${obj.image}`;
											}
											return obj;
										});
										response (res,'Data has been update', processResult);
									} catch (err){
										response(res,'Unexpected error', err, null, 500);
									}
								});
							} else {
								return res.status(400).send({
									success : false,
									message : 'updated failed. Cek your id'
								});
							}
						} else {
							return res.status(400).send({
								success : false,
								message : 'updated failed. Cek your name, and location'
							});
						}
					} else {
						response(res, 'Data not found', null, null, 404);
					}
				} catch (err){
					response(res,'Unexpected error', err, null, 500);
				}
			} else {
				response(res, 'Bad request', err, null, 400);
			}
		}
	});
};


module.exports = {getVehicles, deleteVehicle, postVehicle, patchVehicle};