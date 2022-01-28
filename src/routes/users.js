const users = require('express').Router();

const {getUsers, getUser, postUsers, deleteUser} = require ('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/register', postUsers);
users.delete('/:id', deleteUser);

module.exports = users;