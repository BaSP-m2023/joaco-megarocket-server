const express = require('express');
const activities = require('./activity');

const router = express.Router();
const classes = require('./class');
const members = require('./member');
const trainers = require('./trainer');

router.use('/activities', activities);

router.get('/', (req, res) => {
  res.send('you have reached the api route');
});

router.use('/members', members);
router.use('/classes', classes);
router.use('/trainers', trainers);

module.exports = router;
