const users = require('express').Router();
const { verify } = require('../helpers/auth');

const {getUsers, postUsers, deleteUser, patchUser, patchUserEditPassword} = require ('../controllers/users');

users.get('/', getUsers);
users.post('/', postUsers);
users.delete('/', deleteUser);
users.patch('/', patchUser);
users.patch('/editPassword', verify , patchUserEditPassword);


module.exports = users;