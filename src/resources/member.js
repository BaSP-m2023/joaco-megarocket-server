const express = require('express');
const fs = require('fs');

const router = express.Router();
const members = require('../data/member.json');

router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
  const { firstName } = req.query;
  if (!firstName) {
    res.send(members);
  }
  const filteredMembers = members.filter((member) => member.first_name === firstName);
  res.send(filteredMembers);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const memberFound = members.find((member) => member.id.toString() === id);
  // eslint-disable-next-line no-unused-expressions
  (memberFound) ? res.send(memberFound) : res.send("Member doesn't exists");
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const memberFounded = members.find((member) => member.id.toString() === id);
  if (!memberFounded) {
    res.send("Member doesn't exists");
  }
  const filterMembers = members.filter((member) => member.id.toString() !== id);
  fs.writeFile(
    'src/data/member.json',
    JSON.stringify(filterMembers, null),
    (err) => {
      // eslint-disable-next-line no-unused-expressions
      err ? res.send('Member cannot be deleted') : res.send('Member Deleted!');
    },
  );
});

module.exports = router;
