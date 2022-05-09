const auth = require('express').Router();

const { login,verify, forgotRequest, userVerify, requestVerify } = require('../controllers/auth');
const { verify : _verify } = require('../helpers/auth');

auth.post('/login', login);
auth.post('/verify', verify);
auth.post('/forgotRequest', forgotRequest);
auth.patch('/verify', _verify, userVerify);
auth.patch('/requestVerify', _verify, requestVerify);

module.exports = auth;