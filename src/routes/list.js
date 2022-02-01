const list = require('express').Router();
const {getList} = require ('../controllers/list');


list.get('/', getList);

module.exports = list;