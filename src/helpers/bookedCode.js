exports.booked = ()=>{
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
 
	for (let i = 0; i < 8; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
 
	return text;
};

exports.payment = ()=>{
	let text = '';
	let possible = '0123456789';
 
	for (let i = 0; i < 8; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
 
	return text;
};

exports.code = ()=>{
	let text = '';
	let possible = '0123456789';
 
	for (let i = 0; i < 6; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
 
	return text;
};