// src/routes/users.js
const express = require('express');
const { registerUser, loginUser,fetchCustomers } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/',fetchCustomers);
module.exports = router;
