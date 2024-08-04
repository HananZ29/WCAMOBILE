const express = require('express');
const router = express.Router();
const { fetchActivityTypes, addActivityType, editActivityType, deleteActivityType } = require('../controllers/activityController');

// Fetch all activity types
router.get('/', fetchActivityTypes);

// Add a new activity type
router.post('/', addActivityType);

// Edit an activity type
router.put('/:id', editActivityType);

// Delete an activity type
router.delete('/:id', deleteActivityType);

module.exports = router;
