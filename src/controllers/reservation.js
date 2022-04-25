const { booked } = require('../helpers/bookedCode');
const { responseHandler } = require('../helpers/responseHandler');
const reservationModel = require('../models/reservation');

exports.postReservation = async(req, res)=>{
	try{
		const {idCard, name, lastName, contact, email, payment} = req.body; 
		const bookedCode = booked();
		const data = {idCard, name, lastName, contact, email, payment, bookedCode};
		const reservation = await reservationModel.postReservation(data);
		const result = await reservationModel.getReservation(reservation.insertId);
		return responseHandler(res, 200, 'Reservation created', result);
	} catch(err){
		return responseHandler( res, 500, 'Unexpected error', null, err);
	}
};