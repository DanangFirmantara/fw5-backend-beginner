const multer = require('multer');

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
	if(file.mimetype !== 'image/png'){
		cb(Error('Filetype mismatch', false));
	} else {
		cb(null, true);
	}
};

const upload = multer({ storage: storage, fileFilter });

module.exports = upload;