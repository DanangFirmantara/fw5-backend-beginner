exports.validationInt = (data) =>{
	// idenya menakses semua data yang ada dan lakukan validasi dengan memafaatkan metode perulangan. 
	// example misalnya data = {id, name, location, page, limit}
	// pada perualngan pertama dicek apakah id undefined atau parseInt(id) == naN
	// coba tanya ke mas irul bagaimana cara membuat data kosong dan data yang berisi spasi saja menjadi satu data yang dibilang sama

	// ada 3 kondisi
	// data tidak ada berarti undefined kita ingin yang undefined diabaikan
	// data ada tetapi string kita ingin mengembalikan error data must be integer
	// data ada tetapi kosong kita ingin menembalikan data must be fill

	let err = [];
	for (const [key, value] of Object.entries(data)) {
		if(value != undefined){
			if(value.trim() == ''){
				err.push(`${key} must be fill`);
			} 
			else if(!parseInt(value)){
				err.push(`${key} must be integer`);
			} 
		}
	}
	return err;
};