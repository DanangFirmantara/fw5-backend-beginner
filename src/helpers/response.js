const {APP_URL} = process.env;

exports.response = (res, message,  data, dataPage=null, status=200)=>{
	let pageInfo;
	let results;
	let error;
	let success = true;
	if(dataPage){
		let {total, limit, page, url, route} = dataPage;
		const last = Math.ceil(total/limit);
		pageInfo = {
			prev : page > 1? `${APP_URL}/${route}?page=${page-1}&${url}` : null,
			next : page < last? `${APP_URL}/${route}?page=${page+1}&${url}` : null,
			totalData : total,
			currentPage : page,
			lastPage : last	
		};
	}
	if (data){
		if(data.errno){
			error = data;
		} else {
			results = data;
			console.log(results);
			results.map(obj =>{
				if(obj.image){
					obj.image = APP_URL + '/' + obj.image;

				}
			});
		}
	}
	if (status >= 400){
		success = false;
	}
	data = {success, error, message, pageInfo, results};
	const _send = {};
	const fillable = ['success', 'message', 'results', 'error', 'pageInfo'];
	fillable.forEach(obj =>{
		if(obj){
			_send[obj] = data[obj];
		}
	});
	return res.status(status).send(_send);
};