const express = require('express');
const router = express.Router();
const userConroller = require('../controller/userController');


router.route('/login').post(userConroller.login);

module.exports = router;