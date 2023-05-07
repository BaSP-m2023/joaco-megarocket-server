// const fs = require('fs');
const express = require('express');
const admins = require('../data/admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

router.get('/:id', (req, res) => {
  const adminId = req.params.id;
  const getAdmin = admins.filter((admin) => admin.id === adminId);

  if (getAdmin) {
    res.status(200).json(getAdmin);
  } else {
    res.status(400).json({ error: 'admin not found' });
  }
});

module.exports = router;
