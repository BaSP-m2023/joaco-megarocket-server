const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('you have reached the api route');
});

const Subscription = require('./subscription');

router.use('/subscription', Subscription);

module.exports = router;
