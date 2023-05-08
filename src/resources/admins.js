const fs = require('fs');
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
    res.status(400).json({ msg: 'admin not found' });
  }
});

router.put('/edit/:id', (req, res) => {
  const adminId = req.params.id;
  const foundAdmin = admins.find((admin) => admin.id === adminId);

  if (foundAdmin) {
    const {
      id, email, password, firstName, lastName, dni, phone,
    } = req.body;

    if (id && id !== foundAdmin.id) {
      res.status(400).json({ msg: 'Id can not be modified' });
    }
    foundAdmin.email = email || foundAdmin.email;
    foundAdmin.password = password || foundAdmin.password;
    foundAdmin.firstName = firstName || foundAdmin.firstName;
    foundAdmin.lastName = lastName || foundAdmin.lastName;
    foundAdmin.dni = dni || foundAdmin.dni;
    foundAdmin.phone = phone || foundAdmin.phone;

    fs.writeFileSync('src/data/admins.json', JSON.stringify(admins));

    res.status(200).json({ msg: 'Admin updated successfully' });
  } else {
    res.status(400).json({ msg: 'Admin not found' });
  }
});

module.exports = router;
