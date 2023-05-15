const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('you have reached the api route');
});

const SuperAdmin = require('./super-admin');

router.use('/super-admin', SuperAdmin);

module.exports = router;
