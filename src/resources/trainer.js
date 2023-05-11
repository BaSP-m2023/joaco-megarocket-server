const express = require('express');
const fs = require('fs');
const trainers = require('../data/trainer.json');

const router = express.Router();
router.get('/', (req, res) => res.json(trainers));

router.post('/', (req, res) => {
  let newTrainer = req.body;
  const requiredInfo = ['email', 'password', 'first_name', 'last_name', 'phone', 'address'];
  const validInfo = Object.keys(newTrainer).every((field) => requiredInfo.includes(field));
  if (validInfo
    && requiredInfo.every((field) => Object.prototype.hasOwnProperty.call(newTrainer, field)
    && newTrainer[field])) {
    const lastId = parseInt(trainers[trainers.length - 1].id, 10);
    newTrainer = { id: (lastId + 1).toString(), ...newTrainer };
    trainers.push(newTrainer);
    fs.writeFileSync('src/data/trainer.json', JSON.stringify(trainers, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Error! Trainer user cannot be created' });
      } else {
        res.status(200).json({ msg: 'Trainer user created succesfully!' });
      }
    });
  } else {
    res.status(400).json({ msg: 'Trainer info is incomplete or incorrect' });
  }
});

router.delete('/:id', (req, res) => {
  const trainerId = req.params.id;
  const existTrainer = trainers.some((trainer) => trainer.id === trainerId);
  if (existTrainer) {
    const filtered = trainers.filter((trainer) => trainer.id !== trainerId);
    fs.writeFile('src/data/trainer.json', JSON.stringify(filtered, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: `Error! Trainer with ID ${trainerId} cannot be deleted` });
      } else {
        res.status(200).json({ msg: `Trainer with ID ${trainerId} was deleted succesfully!` });
      }
    });
  } else {
    res.status(400).json({ msg: `Trainer with ID ${trainerId} does not exist` });
  }
});

router.get('/', (req, res) => res.json(trainers));

router.get('/:id', (req, res) => {
  const trainerFound = trainers.find((trainer) => trainer.id.toString() === req.params.id);
  if (trainerFound) {
    res.send(trainerFound);
  } else {
    res.status(400).json({ msg: `No trainer with the id of ${req.params.id}` });
  }
});

router.put('/:id', (req, res) => {
  const trainerId = req.params.id;
  const trainerFound = trainers.find((trainer) => trainer.id.toString() === trainerId);
  const trainerUpd = req.body;
  const indexFound = trainers.indexOf(trainerFound);
  if (!trainerFound) {
    res.status(400).json({ msg: `The trainer ${trainerId} doesn't exist` });
    return;
  }
  if (Object.entries(trainerUpd).length === 0) {
    res.status(400).json({ msg: 'Please fill the empty fields' });
    return;
  }
  trainerFound.email = trainerUpd.email ? trainerUpd.email : trainerFound.email;
  trainerFound.password = trainerUpd.password ? trainerUpd.password : trainerFound.password;
  trainerFound.first_name = trainerUpd.first_name ? trainerUpd.first_name : trainerFound.first_name;
  trainerFound.last_name = trainerUpd.last_name ? trainerUpd.last_name : trainerFound.last_name;
  trainerFound.phone = trainerUpd.phone ? trainerUpd.phone : trainerFound.phone;
  trainerFound.address = trainerUpd.address ? trainerUpd.address : trainerFound.address;
  trainers[indexFound] = trainerFound;
  fs.writeFile('src/data/trainer.json', JSON.stringify(trainers, null, 2), (err) => {
    if (err) throw err;
    res.status(200).json({ msg: `Trainer ${trainerId} has been modified`, trainerFound });
  });
});
module.exports = router;
