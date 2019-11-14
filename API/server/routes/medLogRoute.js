const express = require('express');
const router = express.Router();
const medlogCtrl = require('../controllers/medlogCtrl');

router.get('/medlog/', medlogCtrl.getMedlog);
router.put('/medlog/', medlogCtrl.putMedlog);
router.delete('/medlog/:id/', medlogCtrl.deleteMedlog);

module.exports = router;
