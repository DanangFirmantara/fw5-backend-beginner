const route = require('express').Router();

route.use('/vehicles',require('./vehicles'));
route.use('/users', require('./users'));
route.use('/profiles', require('./profiles'));

module.exports = route;