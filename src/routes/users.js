const users = require('express').Router();

const {getUsers, postUsers, deleteUser, patchUser} = require ('../controllers/users');

users.get('/', getUsers);
users.post('/', postUsers);
users.delete('/:id', deleteUser);
users.patch('/', patchUser);


module.exports = users;