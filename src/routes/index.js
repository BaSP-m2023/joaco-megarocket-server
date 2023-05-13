const express = require('express');

const router = express.Router();

const admins = require('./admin');

router.get('/', (req, res) => {
  res.send('you have reached the api route');
});

router.use('/admin', admins);
module.exports = router;
