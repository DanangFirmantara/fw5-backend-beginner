const res = require('express/lib/response');
const { resume } = require('../helpers/db');
const vehicleModel = require('../models/vehicles');
const vehicles = require('../routes/vehicles');

const db = require('../helpers/db');

const getVehicles =  (req,res) =>{
	vehicleModel.getVehicles(results =>{
		return res.json({
			success : true,
			message : 'List vehicles',
			results : results
		});
	});
};

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

const deleteVehicle = (req,res)=>{
	const {id} = req.params;
	vehicleModel.deleteVehicle(id,()=>{
		return res.send({
			success : true,
			message : 'Deleted sucess'
		});
	});
};

const postVehicle = (req,res) =>{
	let data = {
		name : req.body.name,
		color : req.body.color,
		price : req.body.price,
		isAvailable : req.body.isAvailable
	};
    
	vehicleModel.postVehicle(data, res =>{
		return res.send ({
			success : true,
			message : 'Vehicle has been inserted',
			results : res
		});
	});
};

const patchVehicle = (req,res) =>{
	const {id} = req.params;
	let data = {
		name : req.body.name,
		color : req.body.color,
		price : req.body.price,
		isAvailable : req.body.isAvailable
	};
	vehicleModel.patchVehicle(id,data,res =>{
		return res.send({
			success : true,
			message : 'Data has been update'
		});
	});
    
};

module.exports = {getVehicles, getVehicle, deleteVehicle, postVehicle, patchVehicle};