'use strict'

const express = require('express');
const router = express.Router();
const SchedulesController = require('../controllers/schedules_controller');

// Rotas do sistema

router.get('/', SchedulesController.get);
router.post('/',SchedulesController.post);

module.exports = router;