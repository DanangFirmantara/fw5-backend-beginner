const vehicles = require('express').Router();

const {getVehicles, getVehicle, deleteVehicle, postVehicle, patchVehicle} = require('../controllers/vehicles');

vehicles.get('/', getVehicles );
vehicles.get('/:id', getVehicle );
vehicles.delete('/:id', deleteVehicle);
vehicles.post('/register', postVehicle);
vehicles.patch('/:id', patchVehicle);

module.exports = vehicles;