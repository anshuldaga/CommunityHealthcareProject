const express = require('express');
const router = express.Router();
const resourcesCtrl = require('../controllers/resourcesCtrl');

router.get('/resources', resourcesCtrl.getResources);

module.exports = router;
