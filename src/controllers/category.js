const { responseHandler } = require('../helpers/responseHandler');
const categoryModel = require('../models/category');

exports.getCategories = async(req,res)=>{
	try{
		const category = await categoryModel.getCategories(); 
		if(category.length === 0){
			return responseHandler(res, 404, 'Data not found');
		}
		return responseHandler(res, 200, 'List category', category);
	} catch(err) {
		return responseHandler(res, 500, 'Unexpected error', null, err);
	}
};