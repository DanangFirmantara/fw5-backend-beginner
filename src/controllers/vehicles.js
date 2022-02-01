/* eslint-disable no-unused-vars */
const res = require('express/lib/response');
const vehicleModel = require('../models/vehicles');
const vehicles = require('../routes/vehicles');

// get vehicles succes error handling
const getVehicles =  (req,res) =>{
	vehicleModel.getVehicles(results =>{
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

//error handling success
const getVehicle = (req,res) =>{
	const {id} = req.params;
	vehicleModel.getVehicle(id, results =>{
		if (results.length > 0){
			return res.send ({
				success : true,
				message : 'Detail vehicle',
				results : results[0]
			});
		}
		else {
			return res.status(404).send({
				success : false,
				message : 'Vehicle not found'
			});
		}
	});
   
};

// error handling success except 1 condition when the id is null
const deleteVehicle = (req,res)=>{
	let {id} = req.params;
	vehicleModel.getVehicle(id,(result) =>{
		vehicleModel.deleteVehicle(id,(results)=>{
			if(results.affectedRows > 0){
				return res.send({
					success : true,
					message : `Data from id ${id} Succesfully deleted `,
					results : result[0]
				});
			} else {
				return res.status(404).send({
					success : false,
					message : 'Deleted Failed'
				});
			}
			
		});
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
		image : req.body.image
	};
	vehicleModel.searchVehicles(data, results =>{
		if (results.length <= 0){
			vehicleModel.postVehicle(data, result =>{
				return res.send({
					success : true,
					message : 'Insert Successfully'
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
	const {id} = req.params;
	let data = {
		name : req.body.name,
		location : req.body.location,
		description : req.body.description,
		price : req.body.price,
		status : req.body.status,
		stock : req.body.stock,
		image : req.body.image
	};
	vehicleModel.getVehicle(id,results =>{
		if (results[0]){
			vehicleModel.searchVehicles(data,result =>{
				if (result.length <= 0){
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
						message : 'updated failed'
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

module.exports = {getVehicles, getVehicle, deleteVehicle, postVehicle, patchVehicle};