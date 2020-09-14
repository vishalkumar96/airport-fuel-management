const express = require('express');
const router = express.Router();
const aircraftConroller = require('../controller/aircraftController');

router.route('/addAircraft').post(aircraftConroller.addAircraft)
router.route('/list').get(aircraftConroller.listAircraft)

module.exports = router;