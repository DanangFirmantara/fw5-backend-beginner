const route = require('express').Router();

route.use('/vehicles',require('./vehicles'));
route.use('/users', require('./users'));
route.use('/profiles', require('./profiles'));
route.use('/list', require('./list'));

module.exports = route;