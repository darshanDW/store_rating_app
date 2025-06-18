const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Admin: list users, create user
router.get('/', auth(['admin']), userController.list);
router.post('/', auth(['admin']), userController.create);

// User: update own password, get own info
router.put('/password', auth(), userController.updatePassword);
router.get('/me', auth(), userController.me);

module.exports = router;