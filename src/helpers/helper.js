exports.validationInt = (data) =>{
	// idenya menakses semua data yang ada dan lakukan validasi dengan memafaatkan metode perulangan. 
	// example misalnya data = {id, name, location, page, limit}
	// pada perualngan pertama dicek apakah id undefined atau parseInt(id) == naN
	// coba tanya ke mas irul bagaimana cara membuat data kosong dan data yang berisi spasi saja menjadi satu data yang dibilang sama
	console.log(data.id);
	let err = [];
	for (const [key, value] of Object.entries(data)) {
		if(!parseInt(value) && value != undefined && value != ''){
			err.push(`${key} must be integer`);
		}
	}
	return err;
};