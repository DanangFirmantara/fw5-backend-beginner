const history = require('express').Router();
const {getHistory,getHistoryUser, postHistory, deleteHistory, patchHistory, finishPayment} = require('../controllers/history');
const { verify, verifyAdmin } = require('../helpers/auth');

history.get('/',verify, verifyAdmin, getHistory);
history.get('/user/',verify, getHistoryUser);
history.post('/',verify, postHistory);
history.delete('/',verify, verifyAdmin, deleteHistory);
history.patch('/',verify, patchHistory);
history.patch('/payment',verify, finishPayment);

module.exports = history;