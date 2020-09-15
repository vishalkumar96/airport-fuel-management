const express = require('express');
const router = express.Router();
const aircraftConroller = require('../controller/aircraftController');
const {tokenVerification} = require('../auth/tokenVerification');
const payloadValidate = require('../utils/payloadValidate')
const validate = require('../validation/validate');


router.route('/addAircraft').post(tokenVerification, validate(payloadValidate.addAircraft), aircraftConroller.addAircraft)
router.route('/list').get(tokenVerification, aircraftConroller.listAircraft)

module.exports = router;