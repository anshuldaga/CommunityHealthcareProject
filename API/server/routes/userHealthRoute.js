const express = require('express');
const router = express.Router();
const UserHealthCtrl = require('../controllers/userHealthCtrl');

router.get('/userhealth/', UserHealthCtrl.getUserHealth);
router.put('/userhealth/', UserHealthCtrl.putUserHealth);

module.exports = router;
