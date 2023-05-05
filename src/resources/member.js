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
    res.status(400).json({ message: `The member with the ID: ${req.params.id}` });
  }
});

module.exports = router;
