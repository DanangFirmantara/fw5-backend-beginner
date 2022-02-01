const profiles = require('express').Router();
const {getProfiles} = require('../controllers/profiles');


profiles.get('/', getProfiles);

module.exports = profiles;