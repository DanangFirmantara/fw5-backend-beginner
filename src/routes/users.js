const users = require('express').Router();
const { verify, verifyAdmin } = require('../helpers/auth');
const {getUsers, postUsers, deleteUser, patchUser, patchUserEditPassword} = require ('../controllers/users');
const { uploadImage } = require('../helpers/upload');

users.get('/', getUsers);
users.post('/', postUsers);
users.delete('/', verify, verifyAdmin, deleteUser);
users.patch('/', verify , uploadImage('image'), patchUser);
users.patch('/editPassword', verify ,uploadImage('image'), patchUserEditPassword);


module.exports = users;