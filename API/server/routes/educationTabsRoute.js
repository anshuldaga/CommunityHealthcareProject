const express = require('express');
const router = express.Router();
const educationTabsCtrl = require('../controllers/educationTabsCtrl');

router.get('/educationtabs', educationTabsCtrl.getEducationTabs);

module.exports = router;
