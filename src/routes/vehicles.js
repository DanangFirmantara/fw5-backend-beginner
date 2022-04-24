const vehicles = require('express').Router();
const {getVehicles, deleteVehicle, postVehicle, patchVehicle, getVehicleDetail} = require('../controllers/vehicles');
const { verify, verifyAdmin } = require('../helpers/auth');
const { uploadImage } = require('../helpers/upload');

vehicles.get('/', getVehicles );
vehicles.get('/:id', getVehicleDetail);
vehicles.delete('/',verify, verifyAdmin, deleteVehicle);
vehicles.post('/',verify, verifyAdmin, uploadImage('image'), postVehicle);
vehicles.patch('/',verify, verifyAdmin, uploadImage('image'),  patchVehicle);

module.exports = vehicles;