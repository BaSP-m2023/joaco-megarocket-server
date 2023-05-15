const express = require('express');

const router = express.Router();
const classRouter = require('./class');

router.use('/class', classRouter);

router.get('/', (req, res) => {
  res.send('you have reached the api route');
});

module.exports = router;
