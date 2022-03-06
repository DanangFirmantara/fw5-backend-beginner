const history = require('express').Router();
const {getHistory,getHistoryUser, postHistory, deleteHistory, patchHistory} = require('../controllers/history');

history.get('/', getHistory);
history.get('/user/', getHistoryUser);
history.post('/', postHistory);
history.delete('/', deleteHistory);
history.patch('/', patchHistory);

module.exports = history;