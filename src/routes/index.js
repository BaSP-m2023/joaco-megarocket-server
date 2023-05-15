const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('you have reached the api route');
});

const trainers = require('./trainer');

router.use('/trainers', trainers);

module.exports = router;
