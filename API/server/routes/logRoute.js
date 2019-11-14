const express = require('express');
const router = express.Router();
const logCtrl = require('../controllers/logCtrl');

router.get('/log/', logCtrl.getLog);
router.put('/log/', logCtrl.putLog);
router.delete('/log/:id/', logCtrl.deleteLog);

module.exports = router;
