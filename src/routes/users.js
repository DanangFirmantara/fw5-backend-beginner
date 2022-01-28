const users = require('express').Router();

const {getUsers, getUser, postUsers, deleteUser, patchUser} = require ('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/register', postUsers);
users.delete('/:id', deleteUser);
users.patch('/:id', patchUser);

module.exports = users;