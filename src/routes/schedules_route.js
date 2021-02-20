'use strict'

const express = require('express');
const router = express.Router();
const SchedulesController = require('../controllers/schedules_controller');

router.get('/', SchedulesController.get);
router.get('/id', SchedulesController.getById);
router.put('/', SchedulesController.put);
router.post('/',SchedulesController.post);

module.exports = router;