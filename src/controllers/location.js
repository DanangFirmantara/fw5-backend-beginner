const { responseHandler } = require('../helpers/responseHandler');
const locationModel = require('../models/location');
exports.getListLocation = async(req, res)=>{
	try{
		const location = await locationModel.getListLocation();
		if(!location){
			return responseHandler(res, 404, 'Data not found');
		}
		return responseHandler(res, 200, 'List Location', location);
	} catch(err){
		return responseHandler(res, 500, 'Unexpected error', null, err);
	}
};