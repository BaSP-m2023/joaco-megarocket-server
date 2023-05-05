const express = require('express');
const fs = require('fs');

const router = express.Router();
const members = require('../data/member.json');

router.get('/', (req, res) => {
  res.send(members);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const memberFound = members.find((member) => member.id.toString() === id);
  (memberFound) ? res.send(memberFound) : res.send('Member not exist');
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const filterMembers = members.filter((member) => member.id.toString() !== id);
  fs.writeFile(
    'src/data/member.json',
    JSON.stringify(filterMembers, null),
    (err) => {
      err ? res.send('Member cannot deleted') : res.send('Member Deleted!');
    },
  );
});

module.exports = router;
