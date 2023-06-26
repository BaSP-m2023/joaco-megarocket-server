import express from 'express';
import trainerController from '../controllers/trainer';
import validations from '../validations/trainer';

const router = express.Router();

router
  .get('/', trainerController.getAllTrainer)
  .get('/:id', trainerController.getTrainerById)
  .post('/', validations.validateCreation, trainerController.createTrainer)
  .put('/:id', validations.validateUpdate, trainerController.updateTrainer)
  .delete('/:id', trainerController.deleteTrainer);

export default router;
