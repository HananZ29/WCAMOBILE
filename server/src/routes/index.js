const express = require('express');
const certificationsRoutes = require('./certifications');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const ordersRoutes = require('./orders');
const trainingsRoutes = require('./trainings');
const paymentsRoutes = require('./payments');
const activityRoutes = require('./activity');
const router = express.Router();

router.use('/certifications', certificationsRoutes);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.use('/orders', ordersRoutes);
router.use('/payments', paymentsRoutes);
router.use('/trainings', trainingsRoutes);
router.use('/activities', activityRoutes);
module.exports = router;
