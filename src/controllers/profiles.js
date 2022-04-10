const { response } = require('../helpers/response');
const profilesModel = require ('../models/profiles');

const getProfiles = async(req, res) =>{
	try{
		let {id} = req.userData;
		const results = await profilesModel.getProfileAsync(id);
		if(results){
			response(res, 'profile', results);
		} else{
			response(res, 'data not found', null, null, 404);
		}
	} catch(err){
		response(res, 'unexpected error', err, null, 500);
	}
};

module.exports = {getProfiles};