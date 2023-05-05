// const fs = require('fs');
const express = require('express');
const admins = require('../data/admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

module.exports = router;
