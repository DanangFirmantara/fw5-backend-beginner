exports.dinamisUrl = function (data) {
	var url = '';
	var i = 0;

	if (data) {
		var temp = Object.entries(data).length - 1;

		if (data.page) {
			temp -= 1;
		}
		for (const [key, value] of Object.entries(data)){
			if(key != 'page'){
				url += key + '=' + value;

				if(i<temp){
					url += '&';
				}
				i++;
			}
		}
	}
	return url;
};