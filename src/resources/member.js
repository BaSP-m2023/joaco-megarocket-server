const express = require('express');
const fs = require('fs');

const members = require('../data/member.json');

const router = express.Router();

router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id.toString() === req.params.id);
  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id.toString() === req.params.id) {
        /* eslint-disable no-param-reassign */
        member.first_name = updateMember.first_name || member.first_name;
        member.last_name = updateMember.last_name || member.last_name;
        member.address = updateMember.address || member.address;
        member.date = updateMember.date || member.date;
        member.phone = updateMember.phone || member.phone;
        member.email = updateMember.email || member.email;
        member.password = updateMember.password || member.password;
        member.membership = updateMember.membership || member.membership;

        res.status(200).json({ message: 'Member updated!', member });
      }
    });
  } else {
    res.status(400).json({ message: `The member with the ID:${req.params.id} doesn't exist` });
  }
});

router.post('/', (req, res) => {
  let newMember = req.body;
  const lastId = members[members.length - 1].id;
  const condition = Object.values(newMember).every((atribute) => atribute !== '');
  const memberKeys = {
    first_name: '',
    last_name: '',
    address: '',
    date: '',
    phone: '',
    email: '',
    password: '',
    membership: '',
  };

  const actualKeys = Object.keys(memberKeys);
  const newKeys = Object.keys(newMember);

  let equalKeys = true;
  for (let i = 0; i < actualKeys.length; i += 1) {
    if (actualKeys[i] !== newKeys[i]) {
      equalKeys = false;
    }
  }

  newMember = { id: lastId + 1, ...newMember };

  if (Object.entries(newMember).length === 0 || !condition || !equalKeys) {
    res.status(400).json({ message: 'You must complete all the properties:', properties: `${Object.keys(memberKeys)}` });
  } else {
    members.push(newMember);
    fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (err) => {
      if (err) throw err;
      res.status(200).json({ message: 'User added successfuly!', members });
    });
  }

  const memberExists = members.some((element) => element.email === newMember.email);

  if (memberExists) {
    res.status(400).json({ message: 'This member already exists' });
  }
});

module.exports = router;
