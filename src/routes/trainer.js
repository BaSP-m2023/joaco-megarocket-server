import express from 'express';
import trainerController from '../controllers/trainer';
import validations from '../validations/trainer';
import verifyToken from '../middleware/authMiddleware';

const router = express.Router();

router
  .get('/', /* (req, res, next) => verifyToken(req, res, ['ADMIN'], next), */ trainerController.getAllTrainer)
  .get('/:id', (req, res, next) => verifyToken(req, res, [/* 'ADMIN' */'TRAINER'], next), trainerController.getTrainerById)
  .post('/', /* (req, res, next) => verifyToken(req, res, ['ADMIN'], next), */ validations.validateCreation, trainerController.createTrainer)
  .put('/:id', /* (req, res, next) => verifyToken(req, res, ['ADMIN', 'TRAINER'], next), */ validations.validateUpdate, trainerController.updateTrainer)
  .delete('/:id', /* (req, res, next) => verifyToken(req, res, ['ADMIN'], next), */ trainerController.deleteTrainer);

export default router;
