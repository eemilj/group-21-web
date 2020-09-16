const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.patch('/:id', userController.patchUserById);
router.delete('/:id', userController.deleteUserById);


module.exports = router;