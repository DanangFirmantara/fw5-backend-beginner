const vehicles = require('express').Router();
const {getVehicles, deleteVehicle, postVehicle, patchVehicle} = require('../controllers/vehicles');
const { verify } = require('../helpers/auth');
const uploadImage = require('../helpers/uploadCloudinary');

vehicles.get('/', getVehicles );
vehicles.delete('/', deleteVehicle);
vehicles.post('/',verify ,uploadImage('image'), postVehicle);
vehicles.patch('/',verify ,uploadImage('image'),  patchVehicle);

module.exports = vehicles;