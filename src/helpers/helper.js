exports.validationInt = (data) =>{

	let err = [];
	for (const [key, value] of Object.entries(data)) {
		if(value != undefined){
			if(value.trim() == ''){
				err.push(`${key} must be fill`);
			} 
			else if(!parseInt(value) && value != 0){
				err.push(`${key} must be integer`);
			} 
		}
	}
	if (err.length > 0){
		err = {
			errno : 1000,
			err
		};
	}
	return err;
};