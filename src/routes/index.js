const express = require('express');

const router = express.Router();
const classes = require('./class');

router.get('/', (req, res) => {
  res.send('you have reached the api route');
});

router.use('/classes', classes);

module.exports = router;
