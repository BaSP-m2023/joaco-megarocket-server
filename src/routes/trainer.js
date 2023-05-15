const express = require('express');

const router = express.Router();
const validation = require('../validations/trainer');
const trainerController = require('../controllers/trainer');

router
  .post('/', validation.validateCreation, trainerController.createTrainer)
  .put('/:id', trainerController.updateTrainer)
  .delete('/:id', trainerController.deleteTrainer);

module.exports = router;
