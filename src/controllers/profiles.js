const { responseHandler } = require('../helpers/responseHandler');
const profilesModel = require ('../models/profiles');

const getProfiles = async(req, res) =>{
	try{
		let {id} = req.userData;
		const results = await profilesModel.getProfileAsync(id);
		if(results){
			return responseHandler(res, 200, 'profile', results);

		} else{
			return responseHandler(res, 404, 'Data not found');
		
		}
	} catch(err){
		return responseHandler( res, 500, 'unexpected error');
		
	}
};

module.exports = {getProfiles};