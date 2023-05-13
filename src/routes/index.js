const express = require('express');

const router = express.Router();
const members = require('./member');

router.get('/', (req, res) => {
  res.send('you have reached the api route');
});

router.use('/members', members);

module.exports = router;
