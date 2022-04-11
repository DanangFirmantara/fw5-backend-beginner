const users = require('express').Router();
const { verify } = require('../helpers/auth');
const uploadImage = require('../helpers/uploadCloudinary');

const {getUsers, postUsers, deleteUser, patchUser, patchUserEditPassword} = require ('../controllers/users');

users.get('/', getUsers);
users.post('/', postUsers);
users.delete('/', deleteUser);
users.patch('/', verify , uploadImage('image'), patchUser);
users.patch('/editPassword', verify ,uploadImage('image'), patchUserEditPassword);


module.exports = users;