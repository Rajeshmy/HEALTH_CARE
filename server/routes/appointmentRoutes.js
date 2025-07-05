const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments } = require('../controlers/appointmentController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, createAppointment);
router.get('/', authMiddleware, getAppointments);

module.exports = router;
