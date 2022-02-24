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
		// for (var _i = 0, _Object$entries = Object.entries(data); _i < _Object$entries.length; _i++) {
		// 	var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
		// 		key = _Object$entries$_i[0],
		// 		value = _Object$entries$_i[1];

		// 	if (key != 'page') {
		// 		url += key + '=' + value;

		// 		if (i < temp) {
		// 			url += '&';
		// 		}

		// 		i++;
		// 	}
		// }
	}
	return url; //output hope page=1&orderBy=category&sortType=DESC
};