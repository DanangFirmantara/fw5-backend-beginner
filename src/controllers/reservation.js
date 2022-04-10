const { booked } = require('../helpers/bookedCode');
const { response } = require('../helpers/response');
const reservationModel = require('../models/reservation');

exports.postReservation = async(req, res)=>{
	try{
		const {idCard, name, lastName, contact, email, payment} = req.body; 
		const bookedCode = booked();
		const data = {idCard, name, lastName, contact, email, payment, bookedCode};
		const reservation = await reservationModel.postReservation(data);
		const result = await reservationModel.getReservation(reservation.insertId);
		return response(res, 'reservation added', result, null, 200);
	} catch(err){
		console.log(err);
	}
};