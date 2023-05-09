/* eslint-disable camelcase */
const express = require('express');
const fs = require('fs');
const superadmins = require('../data/super-admins.json');

const router = express.Router();

router.get('/filter', (req, res) => {
  let filtered = superadmins;
  const { email, first_name, last_name } = req.query;

  if (first_name) {
    filtered = superadmins.filter((superadmin) => superadmin.first_name === first_name);
  }
  if (last_name) {
    filtered = superadmins.filter((superadmin) => superadmin.last_name === last_name);
  }
  if (email) {
    filtered = superadmins.filter((superadmin) => superadmin.email === email);
  }
  if (filtered.length === 0) {
    res.status(400).json({ msg: 'Superadmin not found' });
  }
  res.status(200).json({ data: filtered });
});

router.get('/:id', (req, res) => {
  const superadminId = req.params.id;
  const found = superadmins.find((user) => user.id === superadminId);
  if (found) {
    res.status(200).json({ data: found });
  } else {
    res.status(400).json({ msg: 'Superadmin not found' });
  }
});

router.get('/', (req, res) => {
  res.status(200).json({ data: superadmins });
});

router.post('/', (req, res) => {
  const newSuperadmin = req.body;
  const found = superadmins.find((superadmin) => superadmin.id === newSuperadmin.id);
  if (found) {
    res.status(400).json({ msg: 'A superadmin with that ID already exists' });
  } else if (!newSuperadmin.first_name
             || !newSuperadmin.last_name
             || !newSuperadmin.email
             || !newSuperadmin.password) {
    res.status(400).json({ msg: 'Please send complete information' });
  } else {
    superadmins.push(newSuperadmin);
    fs.writeFile('src/data/super-admins.json', JSON.stringify(superadmins, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Superadmin cannot be created' });
      } else {
        res.status(200).json({ msg: 'Superadmin created' });
      }
    });
  }
});

router.delete('/:id', (req, res) => {
  const superadminId = req.params.id;
  const found = superadmins.find((superadmin) => superadmin.id === superadminId);
  if (found) {
    const filteredUsers = superadmins.filter((user) => user.id !== superadminId);
    fs.writeFile('src/data/super-admins.json', JSON.stringify(filteredUsers, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Superadmin cannot be deleted' });
      } else {
        res.status(200).json({ msg: 'Superadmin deleted' });
      }
    });
  } else {
    res.status(400).json({ msg: 'A superadmin with that ID doesnt exist' });
  }
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
        res.status(400).json({ msg: 'Superadmin cannot be edited' });
      } else {
        res.status(200).json({ msg: 'Superadmin edited' });
      }
    });
  } else {
    res.status(400).json({ msg: 'A superadmin with that ID doesnt exist' });
  }
});

module.exports = router;
