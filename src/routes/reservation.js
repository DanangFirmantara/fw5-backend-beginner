const reservation = require('express').Router();
const reservationController = require('../controllers/reservation');

reservation.post('/', reservationController.postReservation);

module.exports = reservation;