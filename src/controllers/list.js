const listModel = require ('../models/list');

const getList = (req, res) =>{
	let {filterBy} = req.query;
	listModel.getList(filterBy, results =>{
		if (results.length > 0){
			return res.send({
				success : true,
				message : 'List vehicle',
				results : results
			});
		} else {
			return res.status(404).send({
				success : false,
				message : 'Data not found'
			});
		}
        
	});
	
};

module.exports = {getList};