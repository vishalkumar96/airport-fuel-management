const express = require('express');
const router = express.Router();
const airportConroller = require('../controller/airportConroller');
const {tokenVerification} = require('../auth/tokenVerification');

router.route('/addAirport').post(tokenVerification, airportConroller.addAirport)
router.route('/list').get(tokenVerification, airportConroller.listAirport)

router.route('/transaction').post(tokenVerification, airportConroller.transaction);
router.route('/transactionDetail').get(tokenVerification, airportConroller.airportTransactionDetail);

module.exports = router;