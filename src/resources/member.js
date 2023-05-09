const express = require('express');
const fs = require('fs');

const router = express.Router();
const members = require('../data/member.json');

router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
  const errorMessage = "it's not registered";

  const { firstName, membership, email } = req.query;

  if (firstName) {
    const filteredName = members.filter((member) => member.first_name === firstName);
    // eslint-disable-next-line no-unused-expressions
    (filteredName.length === 0)
      ? res.status(400).send(`${firstName} ${errorMessage}`)
      : res.status(200).send(filteredName);
  }

  if (membership) {
    const filteredMembership = members.filter((member) => member.membership === membership);
    // eslint-disable-next-line no-unused-expressions
    (filteredMembership.length === 0)
      ? res.status(400).send(`${membership} is not a valid membership`)
      : res.status(200).send(filteredMembership);
  }

  if (email) {
    const filteredEmail = members.find((member) => member.email === email);
    // eslint-disable-next-line no-unused-expressions
    (!filteredEmail)
      ? res.status(400).send(`${email} ${errorMessage}`)
      : res.status(200).send(filteredEmail);
  }

  if (!firstName || !membership || !email) {
    res.status(200).send(members);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const memberFound = members.find((member) => member.id.toString() === id);
  // eslint-disable-next-line no-unused-expressions
  (memberFound) ? res.status(200).send(memberFound) : res.status(400).send("Member it's not registered");
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const memberFounded = members.find((member) => member.id.toString() === id);
  if (!memberFounded) {
    res.status(400).send("Member doesn't exists");
  }
  const filterMembers = members.filter((member) => member.id.toString() !== id);
  fs.writeFile(
    'src/data/member.json',
    JSON.stringify(filterMembers, null),
    (err) => {
      // eslint-disable-next-line no-unused-expressions
      err ? res.status(400).send('Member cannot be deleted') : res.status(200).send('Member Deleted!');
    },
  );
});

module.exports = router;
