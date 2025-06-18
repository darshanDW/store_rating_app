const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const auth = require('../middleware/auth');

// Admin: create store
router.post('/', auth(['admin']), storeController.create);
// All: list stores
router.get('/', auth(), storeController.list);
// Owner: dashboard
router.get('/owner/dashboard', auth(['owner']), storeController.ownerDashboard);

module.exports = router;