const popularModel = require('../models/popular');

const getPopular = (req, res) =>{
	let {location} = req.query;
	location = location || '';
	console.log(location);
	popularModel.getPopular(location, results =>{
		if(results.length > 0){
			return res.send({
				success : true,
				message : 'List of Popular by',
				results : results
			});
		} else {
			return res.status(404).send({
				success : false,
				message : 'Data not found'
			});
		}
	});
};

module.exports = {getPopular};