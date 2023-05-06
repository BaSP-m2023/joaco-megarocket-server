const express = require('express');
const fs = require('fs');
const superadmins = require('../data/super-admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(superadmins);
});

router.get('/:id', (req, res) => {
  const superadminId = req.params.id;
  const found = superadmins.find((user) => user.id === superadminId);
  if (found) {
    res.send(found);
  } else {
    res.send('Superadmin not found');
  }
});

router.post('/', (req, res) => {
  const newSuperadmin = req.body;
  const found = superadmins.find((superadmin) => superadmin.id === newSuperadmin.id);
  if (found) {
    res.send('A superadmin with that ID already exists');
  } else if (!newSuperadmin.first_name
             || !newSuperadmin.last_name
             || !newSuperadmin.email
             || !newSuperadmin.password) {
    res.send('Please send complete information');
  } else {
    superadmins.push(newSuperadmin);
    fs.writeFile('src/data/super-admins.json', JSON.stringify(superadmins, null, 2), (err) => {
      if (err) {
        res.send('Superadmin cannot be created');
      } else {
        res.send('Superadmin created');
      }
    });
  }
});

router.delete('/:id', (req, res) => {
  const superadminId = req.params.id;
  const filteredUsers = superadmins.filter((user) => user.id !== superadminId);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(filteredUsers, null, 2), (err) => {
    if (err) {
      res.send('Superadmin cannot be deleted');
    } else {
      res.send('Superadmin deleted');
    }
  });
});

router.put('/:id', (req, res) => {
  const superadminId = req.params.id;
  const found = superadmins.find((superadmin) => superadmin.id === superadminId);
  const updSuperadmin = req.body;
  if (found) {
    found.first_name = updSuperadmin.first_name ? updSuperadmin.first_name : found.first_name;
    found.last_name = updSuperadmin.last_name ? updSuperadmin.last_name : found.last_name;
    found.email = updSuperadmin.email ? updSuperadmin.email : found.email;
    found.password = updSuperadmin.password ? updSuperadmin.password : found.password;
    const toReplace = superadmins.indexOf(found);
    superadmins.splice(toReplace, 1, found);
    fs.writeFile('src/data/super-admins.json', JSON.stringify(superadmins, null, 2), (err) => {
      if (err) {
        res.send('Superadmin cannot be edited');
      } else {
        res.send('Superadmin edited');
      }
    });
  } else {
    res.send('A superadmin with that ID doesnt exist');
  }
});

module.exports = router;
