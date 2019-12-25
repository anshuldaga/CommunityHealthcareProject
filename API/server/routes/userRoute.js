const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userCtrl');

router.post('/signup/user', UserCtrl.createUser);
router.post('/login/user', UserCtrl.loginUser);
router.post('/health-calendar', UserCtrl.addEvent);0
router.get('/health-calendar/', UserCtrl.getAppointment);
//router.get('/userhealth/', UserCtrl.getUserHealth);
//router.get('/userhealth/', UserCtrl.checkToken, UserCtrl.getUserHealth);

module.exports = router;
