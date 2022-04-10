const history = require('express').Router();
const {getHistory,getHistoryUser, postHistory, deleteHistory, patchHistory} = require('../controllers/history');
const { verify } = require('../helpers/auth');

history.get('/', getHistory);
history.get('/user/', getHistoryUser);
history.post('/',verify, postHistory);
history.delete('/', deleteHistory);
history.patch('/', patchHistory);

module.exports = history;