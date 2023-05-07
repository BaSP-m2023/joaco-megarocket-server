const express = require('express');

const trainers = require('../data/trainer.json');

const router = express.Router();

router.get('/', (req, res) => res.json(trainers));

router.get('/:id', (req, res) => {
  const trainerFound = trainers.find((trainer) => trainer.id.toString() === req.params.id);
  if (trainerFound) {
    res.json(trainers.filter((trainer) => trainer.id.toString() === req.params.id));
  } else {
    res.status(400).json({ msg: `No trainer with the id of ${req.params.id}` });
  }
});

module.exports = router;
