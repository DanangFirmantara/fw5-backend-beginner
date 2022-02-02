const history = require('express').Router();
const {getHistory} = require('../controllers/history');

history.get('/', getHistory);

module.exports = history;