const history = require('express').Router();
const {getHistory, postHistory, deleteHistory, patchHistory} = require('../controllers/history');

history.get('/', getHistory);
history.post('/', postHistory);
history.delete('/', deleteHistory);
history.patch('/', patchHistory);

module.exports = history;