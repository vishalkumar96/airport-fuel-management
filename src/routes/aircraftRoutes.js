const express = require('express');
const router = express.Router();
const aircraftConroller = require('../controller/aircraftController');
const {tokenVerification} = require('../auth/tokenVerification');

router.route('/addAircraft').post(tokenVerification, aircraftConroller.addAircraft)
router.route('/list').get(tokenVerification, aircraftConroller.listAircraft)

module.exports = router;