const express = require('express');
const superadmin = require('../data/super-admins.json');

const router = express.Router();
router.get('/get', (req, res) => {
  res.send(superadmin);
});

router.get('/getById/:id', (req, res) => {
  const userId = req.params.id;
  const found = superadmin.find((user) => user.id === userId);
  if (found) {
    res.send(found);
  } else {
    res.send('Superadmin not found');
  }
});

module.exports = router;
