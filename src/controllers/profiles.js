const profilesModel = require ('../models/profiles');

const getProfiles = (req, res) =>{
	let {id} = req.query;
	id = parseInt(id) || '';
	profilesModel.getProfiles(id, results =>{
		if(results.length > 0){
			return res.send ({
				success : true,
				message : 'List profiles',
				results : results
			});
		} else {
			return res.status(404).send ({
				success : false,
				message : 'Data not found'
			});
		}
		
	});
	
};

module.exports = {getProfiles};