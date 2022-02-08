const listModel = require ('../models/list');
const helper = require('../helpers/helper');

const getList = (req, res) =>{
	let {filterBy,page, limit, orderBy, sortType} = req.query;
	let validate = {page, limit};
	let err = helper.validationInt(validate);
	if (err.length <= 0){
		page = parseInt(page) || 1;
		limit = parseInt(limit) || 5;
		orderBy = orderBy || 'id';
		sortType = sortType || 'ASC';
		let offset = (page - 1) * limit;
		let data = {filterBy, limit, offset, orderBy, sortType};
		listModel.getList(data, results =>{
			if (results.length > 0){
				listModel.counList(data, final =>{
					const {total} = final[0];
					let last = Math.ceil(total/limit);
					return res.send({
						success : true,
						message : 'List vehicle',
						results : results,
						pageInfo : {
							prev : page > 1 ? `http://localhost:5000/list?filterBy=Car&page=${page-1}`:null,
							next : page < last ? `http://localhost:5000/list?filterBy=Car&page=${page+1}` : null,
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
		return res.status(400).send({
			success : false,
			message : 'Bad request.',
			error : err
		});
	}
	
	
};

module.exports = {getList};