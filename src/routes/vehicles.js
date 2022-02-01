const vehicles = require('express').Router();

const {getVehicles, deleteVehicle, postVehicle, patchVehicle} = require('../controllers/vehicles');

vehicles.get('/', getVehicles );
vehicles.delete('/', deleteVehicle);
vehicles.post('/', postVehicle);
vehicles.patch('/', patchVehicle);

module.exports = vehicles;