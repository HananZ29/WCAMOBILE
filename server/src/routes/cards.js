const express = require('express');
const router = express.Router();
const { addCard } = require('../controllers/cardsController');

router.post('/', addCard);

module.exports = router;
