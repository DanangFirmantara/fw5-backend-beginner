const historyModel = require ('../models/history');

const getHistory = (req, res) =>{
	let {id} = req.query;
	id = parseInt(id) || '';
	console.log(id);
	historyModel.getHistory(id, results=>{
		if(results.length > 0){
			return res.send({
				success : true,
				message : 'List of Histories',
				results : results
			});
		} else {
			return res.status(404).send({
				success : false,
				message : 'Data not found',
			});
		}
	});
};

module.exports = {getHistory};