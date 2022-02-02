const history = require('express').Router();
const {getHistory, postHistory} = require('../controllers/history');

history.get('/', getHistory);
history.post('/', postHistory);

module.exports = history;