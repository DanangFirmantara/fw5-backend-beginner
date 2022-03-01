const auth = require('express').Router();

const { login,verify, forgotRequest } = require('../controllers/auth');

auth.post('/login/', login);
auth.post('/verify', verify);
auth.post('/forgotRequest', forgotRequest);

module.exports = auth;