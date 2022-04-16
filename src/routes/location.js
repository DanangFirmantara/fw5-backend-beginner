const location = require('express').Router();
const locationController = require('../controllers/location');
location.get('/', locationController.getListLocation);

module.exports = location;