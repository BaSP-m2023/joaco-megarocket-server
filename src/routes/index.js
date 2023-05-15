const express = require('express');

const router = express.Router();
const trainers = require('./trainer');

router.get('/', (req, res) => {
  res.send('you have reached the api route');
});

router.use('/trainers', trainers);

module.exports = router;
