const express = require('express');
const router = express.Router();
const medNamesCtrl = require('../controllers/medNamesCtrl');

router.get('/mednames/', medNamesCtrl.getMednames);
router.put('/mednames/', medNamesCtrl.putMednames);

module.exports = router;
