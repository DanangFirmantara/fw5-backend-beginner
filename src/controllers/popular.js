/* eslint-disable no-unused-vars */
const popularModel = require('../models/popular');
const helper = require('../helpers/helper');
const {dinamisUrl} = require('../helpers/dinamisUrl');
const { response } = require('../helpers/response');
const { pageInfo } = require('../helpers/pageInfo');
const { responseHandler } = require('../helpers/responseHandler');
const getPopular = async(req, res) =>{
	try{
		const route = 'popular';
		let {idLocation, page, limit} = req.query;
		let validate = {page, limit};
		const url = dinamisUrl(req.query);
		let err = helper.validationInt(validate);
		if (err.length <= 0){
			idLocation = idLocation || '';
			page = parseInt(page) || 1;
			limit = parseInt(limit) || 4;
			let offset = (page - 1) * limit;
			let data = {idLocation, limit, offset};
			const results = await popularModel.getPopularAsync(data);
			if(results.length > 0){
				const final = await popularModel.countPopularAsync(data);
				let {total} = final[0];
				const _pageInfo = pageInfo(total, limit, page, url, route);
				return responseHandler(res,200, 'Popular vehicle', results, null, _pageInfo);
			} else {
				return responseHandler(res, 404, 'Data not found');
			}
		} else {
			return responseHandler(res, 400, 'Bad request', null, err);
		}
	} catch (err){
		return responseHandler( res, 500, 'Unexpected error', null, err);
	}
};

module.exports = {getPopular};