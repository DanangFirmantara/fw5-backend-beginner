const popular = require('express').Router();
const { getPopular } = require('../controllers/popular');


popular.get('/', getPopular);

module.exports = popular;