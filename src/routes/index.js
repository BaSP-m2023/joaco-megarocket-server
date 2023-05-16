const express = require('express');
const activities = require('./activity');
const classes = require('./class');
const members = require('./member');
const trainers = require('./trainer');
const admins = require('./admin');

const router = express.Router();

router.use('/classes', classes);
router.use('/members', members);
router.use('/trainers', trainers);
router.use('/admins', admins);
router.use('/activities', activities);

module.exports = router;
