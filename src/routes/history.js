const history = require('express').Router();
const {getHistory,getHistoryUser, postHistory, deleteHistory, patchHistory, finishPayment} = require('../controllers/history');
const { verify } = require('../helpers/auth');

history.get('/', getHistory);
history.get('/user/',verify, getHistoryUser);
history.post('/',verify, postHistory);
history.delete('/', deleteHistory);
history.patch('/', patchHistory);
history.patch('/payment',verify, finishPayment);

module.exports = history;