const express = require('express');
const router = express.Router();
const passport = require('passport');
const frontendController = require('../controllers/frontendController');

router.get('/', passport.check2faAuth,frontendController.home);
router.use('/', require('./users'));

module.exports = router;