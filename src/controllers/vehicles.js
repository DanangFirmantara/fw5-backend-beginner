/* eslint-disable no-unused-vars */
const vehicleModel = require('../models/vehicles');
const helper = require('../helpers/helper');
const {APP_URL} = process.env;
const upload = require('../helpers/upload').single('image');
const fs = require('fs');
const { response } = require('../helpers/response');

// get vehicles succes error handling
const getVehicles = async(req,res) =>{
	let {name,id, location, page, limit, orderBy, sortType} = req.query;
	let validate = {id, page, limit};
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
				const last = Math.ceil(total/limit);
				response(res, 'List vehicles new', results,{limit, total, page});
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
const deleteVehicle = (req,res)=>{
	let {id} = req.query;
	let validate = {id};
	let err = helper.validationInt(validate);
	if(err.length <= 0 ){
		id = parseInt(id) || 0;
		vehicleModel.getVehicle(id,(result) =>{
			if (result.length > 0){
				vehicleModel.deleteVehicle(id,(results)=>{
					return res.send({
						success : true,
						message : `Data from id ${id} Succesfully deleted `,
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
			message :'Bad request',
			error : err
		});
	}
	
};

const postVehicle = (req,res) =>{
	let {name, location, description, price, status, stock, image, category} = req.body;
	let validate = {price, stock};
	let err = helper.validationInt(validate);
	if(err.length <= 0){
		let data = {name, location, description, price, status, stock, image, category};
		vehicleModel.searchVehicles(data, results =>{
			if (results.length <= 0){
				vehicleModel.postVehicle(data, result =>{
					vehicleModel.getVehicle(result.insertId, final =>{
						return res.send({
							success : true,
							message : 'Insert Successfully',
							results : final[0]
						});
					});
				});
			} else {
				return res.status(400).send({
					success : false,
					message : 'insert failed. name and location has been input '
				});
			}
		});
	} else {
		return res.status(400).send({
			success : false,
			message :'Bad request',
			error : err
		});
	}
	
};

//update success handling error
const patchVehicle = (req,res) =>{
	console.log(req.file);
	upload(req, res, err=>{
		if(err){
			return res.send({
				success : false,
				message : err.message
			});
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
				data.image = req.file.path;
			}
			console.log(data);
			if (err.length <= 0){
				id = parseInt(id) || 0;
				vehicleModel.getVehicle(id,results =>{
					if (results.length > 0){
						vehicleModel.searchVehicles(data,result =>{
							if (result.length > 0){
								if (result[0].id == id){
									fs.rm(result[0].image,{ recursive : true }, err =>{
										if (err) {
											response(res, 'File not found', err, null, 500);
										}
										vehicleModel.patchVehicle(id,data,resu =>{
											vehicleModel.getVehicle(id,final =>{
												const processResult = final.map(obj=>{
													if(obj.image !== null){
														obj.image = `${APP_URL}/${obj.image}`;
													}
													return obj;
												});
												return res.send({
													success : true,
													message : 'Data has been update',
													results : processResult
												});
											});
										});
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
					message :'Bad request',
					error : err
				});
			}
	
    
		}
	});
};


module.exports = {getVehicles, deleteVehicle, postVehicle, patchVehicle};