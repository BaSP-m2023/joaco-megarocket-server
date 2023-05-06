const express = require('express');
const fs = require('fs');
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

router.post('/post', (req, res) => {
  const newSuperadmin = req.body;
  superadmin.push(newSuperadmin);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superadmin, null, 2), (err) => {
    if (err) {
      res.send('Superadmin cannot be created');
    } else {
      res.send('Superadmin created');
    }
  });
});

router.delete('/:id', (req, res) => {
  const superadminId = req.params.id;
  const filteredUsers = superadmin.filter((user) => user.id !== superadminId);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(filteredUsers, null, 2), (err) => {
    if (err) {
      res.send('Superadmin cannot be deleted');
    } else {
      res.send('Superadmin deleted');
    }
  });
});

module.exports = router;
