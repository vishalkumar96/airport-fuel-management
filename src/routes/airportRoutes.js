const express = require('express');
const router = express.Router();
const airportConroller = require('../controller/airportConroller');

router.route('/addAirport').post(airportConroller.addAirport)
router.route('/list').get(airportConroller.listAirport)

router.route('/transaction').post(airportConroller.transaction);
router.route('/transactionDetail').get(airportConroller.airportTransactionDetail);

module.exports = router;