const express = require('express');
const fs = require('fs');

const trainers = require('../data/trainer.json');

const router = express.Router();

// GET all the trainers

router.get('/', (req, res) => res.json(trainers));

// GET

router.get('/:id', (req, res) => {
  const trainerFound = trainers.find((trainer) => trainer.id.toString() === req.params.id);
  if (trainerFound) {
    res.json(trainers.filter((trainer) => trainer.id.toString() === req.params.id));
  } else {
    res.status(400).json({ msg: `No trainer with the id of ${req.params.id}` });
  }
});

// PUT

router.put('/:id', (req, res) => {
  const trainerId = req.params.id;
  const trainerFound = trainers.find((trainer) => trainer.id.toString() === trainerId);
  const trainerUpd = req.body;
  const indexFound = trainers.indexOf(trainerFound);
  if (!trainerFound) {
    res.status(400).json({ msg: `The trainer ${trainerId} doesn't exist` });
  }
  if (Object.entries(trainerUpd).length === 0) {
    res.status(400).json({ msg: 'Please fill the empty fields' });
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
