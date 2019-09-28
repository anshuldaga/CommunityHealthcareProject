const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userCtrl');

router.post('/signup/user', UserCtrl.createUser);
router.post('/login/user', UserCtrl.loginUser);
router.post('/calendar', UserCtrl.addEvent);

module.exports = router;