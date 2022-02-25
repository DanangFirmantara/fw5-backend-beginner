/* eslint-disable no-unused-vars */
const popularModel = require('../models/popular');
const helper = require('../helpers/helper');
const {dinamisUrl} = require('../helpers/dinamisUrl');
const { response } = require('../helpers/response');

const getPopular = async(req, res) =>{
	try{
		const route = 'popular';
		let {location, page, limit} = req.query;
		let validate = {page, limit};
		const url = dinamisUrl(req.query);
		let err = helper.validationInt(validate);
		if (err.length <= 0){
			location = location || '';
			page = parseInt(page) || 1;
			limit = parseInt(limit) || 4;
			let offset = (page - 1) * limit;
			let data = {location, limit, offset};
			const results = await popularModel.getPopularAsync(data);
			console.log(results);
			if(results.length > 0){
				const final = await popularModel.countPopularAsync(data);
				let {total} = final[0];
				response(res,'List Popular', results, {total, page, limit,route, url});
			} else {
				response(res, 'Data not found', null, null, 404);
			
			}
		} else {
			response(res,'Bad request',err, null, 400);
		}
	} catch (err){
		response(res, 'Unexpected error', err, null, 500);
	}
};

module.exports = {getPopular};