const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { responseHandler } = require('./src/helpers/responseHandler');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(require('./src/routes'));
app.use('/uploads', express.static('uploads'));

const httpMethods = ['get', 'post', 'put', 'patch', 'delete'];

httpMethods.forEach((el)=>{
	app[el]('*', (req, res) =>{
		return responseHandler(res, 404, 'Destination not found');
	});
});

const {APP_PORT, PORT} = process.env;

app.listen(PORT || APP_PORT,()=>{
	console.log(`App listening on port ${PORT || APP_PORT}`);
});