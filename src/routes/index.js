const express = require('express');
const activities = require('./activity');

const router = express.Router();

router.use('/activities', activities);

router.get('/', (req, res) => {
  res.send('you have reached the api route');
});

module.exports = router;
