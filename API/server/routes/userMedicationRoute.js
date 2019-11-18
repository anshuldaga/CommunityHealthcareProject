const express = require('express');
const router = express.Router();
const UserMedicationCtrl = require('../controllers/userMedicationCtrl');

router.get('/usermedication/', UserMedicationCtrl.getUserMedication);
router.put('/usermedication/', UserMedicationCtrl.putUserMedication);
router.delete('/usermedication/:id/', UserMedicationCtrl.deleteUserMedication);

module.exports = router;
