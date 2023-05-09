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

router.put('/:id', (req, res) => {
  const memberFound = members.find((member) => member.id.toString() === req.params.id);
  const updateMember = req.body;

  if (!memberFound) {
    res.status(400).json({ message: `The member with the ID:${req.params.id} doesn't exist` });
    return;
  }

  if (Object.entries(updateMember).length === 0) {
    res.status(400).json({ message: 'There has been no changes', memberFound });
    return;
  }

  memberFound.first_name = updateMember.first_name || memberFound.first_name;
  memberFound.last_name = updateMember.last_name || memberFound.last_name;
  memberFound.address = updateMember.address || memberFound.address;
  memberFound.date = updateMember.date || memberFound.date;
  memberFound.phone = updateMember.phone || memberFound.phone;
  memberFound.email = updateMember.email || memberFound.email;
  memberFound.password = updateMember.password || memberFound.password;
  memberFound.membership = updateMember.membership || memberFound.membership;

  const memberIndex = members.indexOf(memberFound);
  members[memberIndex] = memberFound;

  fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (err) => {
    if (err) throw err;
    res.status(200).json({ message: 'Member updated!', memberFound });
  });
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

  const memberExists = members.some((element) => element.email === newMember.email);

  if (memberExists) {
    res.status(400).json({ message: 'This member already exists' });
    return;
  }

  if (Object.entries(newMember).length === 0 || !condition || !equalKeys) {
    res.status(400).json({ message: 'You must complete all the properties:', properties: `${Object.keys(memberKeys)}` });
    return;
  }

  members.push(newMember);
  fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (err) => {
    if (err) throw err;
    res.status(200).json({ message: 'User added successfuly!', members });
  });
});

module.exports = router;
