const express = require('express');
const router = express.Router();

const groupController = require('../controllers/groups');

router.post('/', groupController.createGroup);
router.get('/', groupController.getAllGroups);
router.get('/:id', groupController.getGroupById);
router.put('/:id', groupController.updateGroupById);
router.patch('/:id', groupController.patchGroupById);
router.delete('/:id', groupController.deleteGroupById);
router.delete('/', groupController.deleteAllGroups);

module.exports = router;