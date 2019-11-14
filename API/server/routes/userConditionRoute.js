const express = require('express');
const router = express.Router();
const UserConditionCtrl = require('../controllers/userConditionCtrl');

router.get('/usercondition/', UserConditionCtrl.getUserCondition);
router.put('/usercondition/', UserConditionCtrl.putUserCondition);
router.delete('/usercondition/:id/', UserConditionCtrl.deleteUserCondition);

module.exports = router;
