const express = require('express');

const router = express.Router();

const trainerController = require('../controllers/trainer');

const validation = require('../validations/trainer');

router
  .get('/', trainerController.getAllTrainer)
  .get('/:id', trainerController.getTrainerById)
  .post('/', validation.validateCreation, trainerController.createTrainer)
  .put('/:id', trainerController.updateTrainer)
  .delete('/:id', trainerController.deleteTrainer);

module.exports = router;
