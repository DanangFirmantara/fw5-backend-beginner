/* eslint-disable no-unused-vars */
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const { responseHandler } = require('./responseHandler');
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		let date = new Date();
		const {fieldname, originalname} = file;
		const extension = originalname.split('.')[1];
		date = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
		const uniqueSuffix = date + '-' + Math.round(Math.random() * 1E9);
		cb(null, `${fieldname}-${uniqueSuffix}.${extension}`);
	}
});

const fileFilter = (req, file, cb) =>{
	const supportMime = [
		'image/jpeg',
		'image/png',
		'image/gif'
	];
	if(!supportMime.includes(file.mimetype)){
		cb(Error('Filetype mismatch', false));
	} else {
		cb(null, true);
	}
};

const upload = multer({ storage: storage, fileFilter });

//upload cloudinary
cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: CLOUD_API_KEY,
	api_secret: CLOUD_API_SECRET
});

const storageCloudinary = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: (req) => {
			const { baseUrl } = req;
			return `backendBeginner/uploads/${baseUrl}`;
		},
		format: async (req, file) => 'png',
		public_id: (req, file) => {
			const timestamp = Date.now();
			const { baseUrl } = req;

			return `${baseUrl}-${timestamp}`;
		}
	}
});

const imageFileFilter = (req, file, cb) => {
	const supportMimeType = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/tiff'];
	if (!supportMimeType.includes(file.mimetype)) {
		cb(new Error('Filetype mismatch!'), false);
	} else {
		cb(null, true);
	}
};

const uploadImage = (key, maxSize = null) => {
	const upload = multer({
		storage: storageCloudinary,
		fileFilter: imageFileFilter,
		limits: {
			fileSize: maxSize || 2097152 // max 2MB
		}
	}).single(key);

	return (req, res, next) => {
		upload(req, res, (err) => {
			if (err) {
				return responseHandler(res, 400, err.message);
			}
			return next();
		});
	};
};

module.exports = {upload, uploadImage};