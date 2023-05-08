const fs = require('fs');
const express = require('express');
const admins = require('../data/admins.json');

const router = express.Router();

router.post('/', (req, res) => {
  let newAdmin = req.body;
  const requiredInfo = ['email', 'password', 'first_name', 'last_name', 'dni', 'phone'];
  const validInfo = Object.keys(newAdmin).every((field) => requiredInfo.includes(field));
  if (!(validInfo
    && requiredInfo.every((field) => Object.prototype.hasOwnProperty.call(newAdmin, field)
    && newAdmin[field]))) {
    res.status(400).json({ msg: 'Admin info is incomplete or incorrect' });
    return;
  }
  const existsAdmin = admins.some((admin) => admin.dni === newAdmin.dni);
  if (existsAdmin) {
    res.status(400).json({ msg: `Admin with DNI ${newAdmin.dni} already exists` });
    return;
  }
  const lastId = parseInt(admins[admins.length - 1].id, 10);
  newAdmin = { id: (lastId + 1).toString(), ...newAdmin };
  admins.push(newAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
    if (err) {
      res.status(400).json({ msg: 'Error! Admin cannot be created' });
    } else {
      res.status(200).json({ msg: 'Admin created succesfully!' });
    }
  });
});

router.delete('/:id', (req, res) => {
  const adminId = req.params.id;
  const existsAdmin = admins.some((admin) => admin.id === adminId);
  if (!existsAdmin) {
    res.status(400).json({ msg: `Admin with ID ${adminId} does not exist` });
    return;
  }
  const filtered = admins.filter((admin) => admin.id !== adminId);
  fs.writeFile('src/data/admins.json', JSON.stringify(filtered, null, 2), (err) => {
    if (err) {
      res.status(400).json({ msg: `Error! Admin with ID ${adminId} cannot be deleted` });
    } else {
      res.status(200).json({ msg: `Admin with ID ${adminId} was deleted succesfully!` });
    }
  });
});

module.exports = router;
