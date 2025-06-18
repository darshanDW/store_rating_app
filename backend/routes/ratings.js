const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const auth = require('../middleware/auth');

// User: submit or update rating
router.post('/', auth(['user']), ratingController.submit);
// Admin: list all ratings
router.get('/', auth(['user','admin']), ratingController.list);

module.exports = router;