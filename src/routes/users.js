const users = require('express').Router();

const {getUsers, getUser, postUsers} = require ('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/register', postUsers);

module.exports = users;