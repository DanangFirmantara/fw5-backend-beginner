/* eslint-disable no-unused-vars */
const listModel = require ('../models/list');
const helper = require('../helpers/helper');
const {dinamisUrl} = require('../helpers/dinamisUrl');
const { response } = require('../helpers/response.js');
const { pageInfo } = require('../helpers/pageInfo');
const { responseHandler } = require('../helpers/responseHandler');

const getList = async(req, res) =>{
	try{
		const route = 'list';
		let {filterBy,page, limit, orderBy, sortType} = req.query;
		let validate = {page, limit};
		const url = dinamisUrl(req.query);
		let err = helper.validationInt(validate);
		if (err.length <= 0){
			page = parseInt(page) || 1;
			limit = parseInt(limit) || 4;
			orderBy = orderBy || 'id';
			sortType = sortType || 'ASC';
			let offset = (page - 1) * limit;
			let data = {filterBy, limit, offset, orderBy, sortType};
			const results = await listModel.getListAsync(data);
			if (results.length > 0){
				const final = await listModel.countListAsync(data);
				const {total} = final[0];
				const route = 'list';
				const _pageInfo = pageInfo(total, limit, page, url,route );
				return responseHandler(res, 200, 'List vehicles', results, null, _pageInfo);
				
			} else {
				return response(res, 'Data not found', null, null, 404);
			}
		} else {
			return response(res,'Bad request', err, null, 400);
		}
	} catch (err){
		return response(res, 'Unexpected error', err, null, 500);
	}

	
	
};

module.exports = {getList};