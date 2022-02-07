/* eslint-disable no-unused-vars */
const vehicleModel = require('../models/vehicles');
const helper = require('../helpers/helper');


// get vehicles succes error handling
const getVehicles =  (req,res) =>{
	let {name,id, location, page, limit} = req.query;
	let validate = {id, page, limit};
	const err = helper.validationInt(validate);
	if (err.length <= 0){
		name = name || '';
		id = parseInt(id) || '';
		location = location || '';
		page = parseInt(page) || 1;
		limit = parseInt(limit) || 5;
		let offset = ( page-1 ) *limit;
		let data = {name, id, location, offset, limit};
		vehicleModel.getVehicles(data ,results =>{
			if(results.length > 0){
				vehicleModel.countVehicles(data, count =>{
					const { total } = count[0];
					const last = Math.ceil(total/limit);
					return res.json({
						success : true,
						message : 'List vehicles',
						results : results,
						pageInfo : {
							prev : page > 1? `http://localhost:5000/vehicles?page=${page-1}` : null,
							next : page < last? `http://localhost:5000/vehicles?page=${page+1}` : null,
							totalData : total,
							currentPage : page,
							lastPage : last
						}
					});
				});
			} else {
				return res.status(404).json({
					success : false,
					message : 'Data Not Found'
				});
			}
		
		});
	} else {
		return res.status(400).send({
			success : false,
			message : 'Bad request. cek your input limit, page, and id must be integer'
		});
	}
};
// error handling success except 1 condition when the id is null
const deleteVehicle = (req,res)=>{
	let {id,search} = req.query;
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
};

const postVehicle = (req,res) =>{
	let data = {
		name : req.body.name,
		location : req.body.location,
		description : req.body.description,
		price : req.body.price,
		status : req.body.status,
		stock : req.body.stock,
		image : req.body.image,
		category : req.body.category
	};
	vehicleModel.searchVehicles(data, results =>{
		if (results.length <= 0){
			vehicleModel.postVehicle(data, result =>{
				return res.send({
					success : true,
					message : 'Insert Successfully',
					results : {data}
				});
			});
		} else {
			return res.status(400).send({
				success : false,
				message : 'insert failed'
			});
		}
	});
};

//update success handling error
const patchVehicle = (req,res) =>{
	let {id} = req.query;
	let data = {
		name : req.body.name,
		location : req.body.location,
		description : req.body.description,
		price : req.body.price,
		status : req.body.status,
		stock : req.body.stock,
		image : req.body.image,
		category : req.body.category
	};
	id = parseInt(id) || 0;
	vehicleModel.getVehicle(id,results =>{
		if (results.length > 0){
			vehicleModel.searchVehicles(data,result =>{
				if (result.length > 0){
					if (result[0].id == id){
						vehicleModel.patchVehicle(id,data,resu =>{
							return res.send({
								success : true,
								message : 'Data has been update',
								results : data
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
    
};


module.exports = {getVehicles, deleteVehicle, postVehicle, patchVehicle};