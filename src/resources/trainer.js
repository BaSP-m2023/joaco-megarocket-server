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
    fs.writeFile('src/data/trainer.json', JSON.stringify(trainers, null, 2), (err) => {
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

module.exports = router;
