const reservation = require('express').Router();
const reservationController = require('../controllers/reservation');
const { verify } = require('../helpers/auth');

reservation.post('/', verify, reservationController.postReservation);

module.exports = reservation;