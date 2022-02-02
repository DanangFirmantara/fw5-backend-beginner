const history = require('express').Router();
const {getHistory, postHistory, deleteHistory} = require('../controllers/history');

history.get('/', getHistory);
history.post('/', postHistory);
history.delete('/', deleteHistory);

module.exports = history;