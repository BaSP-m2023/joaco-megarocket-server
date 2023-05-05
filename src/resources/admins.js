const fs = require('fs');
const express = require('express');
const admins = require('../data/admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

router.post('/', (req, res) => {
  const newAdmin = req.body;
  if (Object.keys(newAdmin).length > 0) {
    admins.push(newAdmin);
    fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Error! Admin cannot be created' });
      } else {
        res.status(200).json({ msg: 'Admin created succesfully!' });
      }
    });
  } else {
    res.status(400).json({ msg: 'Admin info is required' });
  }
});

module.exports = router;
