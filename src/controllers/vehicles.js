/* eslint-disable no-unused-vars */
const vehicleModel = require('../models/vehicles');


// get vehicles succes error handling
const getVehicles =  (req,res) =>{
	let {name,id, location} = req.query;
	name = name || '';
	id = parseInt(id) || '';
	location = location || '';
	let data = {name, id, location};
	vehicleModel.getVehicles(data ,results =>{
		if(results.length > 0){
			return res.json({
				success : true,
				message : 'List vehicles',
				results : results
			});
		} else {
			return res.status(404).json({
				success : false,
				message : 'Data Not Found'
			});
		}
		
	});
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