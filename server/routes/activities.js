const express = require('express');
const router = express.Router();

const ActivityController = require('../controllers/activities');

router.post('/', ActivityController.addActivity);
router.get('/', ActivityController.getActivity);
router.get('/:id', ActivityController.getActivityById);
router.delete('/:id', ActivityController.deleteActivityById);
router.put('/:id', ActivityController.updateActivityById);
router.patch('/:id', ActivityController.patchActivityById);
router.delete('/', ActivityController.deleteActivityAll);
router.post('/:id/groups', ActivityController.createActivityGroup);
router.get('/:id/groups/:groupId', ActivityController.getActivityWithGroupId);
router.delete('/:id/groups/:groupId', ActivityController.deleteActivityGroupWithId);
router.get('/:id/groups', ActivityController.getGroupsWithActivityId);

module.exports = router;
