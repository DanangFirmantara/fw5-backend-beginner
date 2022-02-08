const popularModel = require('../models/popular');
const helper = require('../helpers/helper');

const getPopular = (req, res) =>{
	let {location, page, limit} = req.query;
	let validate = {page, limit};
	let err = helper.validationInt(validate);
	if (err.length <= 0){
		location = location || '';
		page = parseInt(page) || 1;
		limit = parseInt(limit) || 5;
		let offset = (page - 1) * limit;
		let data = {location, limit, offset};
		popularModel.getPopular(data, results =>{
			if(results.length > 0){
				popularModel.countPopular(data, final =>{
					let {total} = final[0];
					let last = Math.ceil(total/limit);
					return res.send({
						success : true,
						message : 'List of Popular',
						results : results,
						pageInfo : {
							prev : page > 1 ? `http://localhost:5000/popular/?page=${page-1}` : null,
							next : page < last ? `http://localhost:5000/popular/?page=${page+1}` : null,
							total : total,
							currentPage : page,
							lastPage : last
						}
					});
				});
			} else {
				return res.status(404).send({
					success : false,
					message : 'Data not found'
				});
			}
		});
	} else {
		return res.status(400).send ({
			success : false,
			message : 'Bad request',
			error : err
		});
	}
};

module.exports = {getPopular};