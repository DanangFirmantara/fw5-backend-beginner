const profiles = require('express').Router();
const { getProfiles } = require('../controllers/profiles');
const { verify } = require('../helpers/auth');


profiles.get('/',verify , getProfiles);

module.exports = profiles;