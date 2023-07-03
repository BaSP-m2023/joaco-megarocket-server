import express from 'express';
import activitiesController from '../controllers/activity';
import validations from '../validations/activity';
import verifyToken from '../middleware/authMiddleware';

const router = express.Router();

router
  .get('/', (req, res, next) => verifyToken(req, res, [/* 'ADMIN', 'TRAINER',  */'MEMBER'], next), activitiesController.getAllActivities)
  .get('/:id', (req, res, next) => verifyToken(req, res, [/* 'ADMIN', 'TRAINER',  */'MEMBER'], next), activitiesController.getActivityByID)
  .post('/', /* (req, res, next) => verifyToken(req, res, ['ADMIN'], next), */ validations.createValidation, activitiesController.createActivity)
  .put('/:id', /* (req, res, next) => verifyToken(req, res, ['ADMIN'], next), */ validations.updateValidation, activitiesController.updateActivity)
  .delete('/:id', /* (req, res, next) => verifyToken(req, res, ['ADMIN'], next), */ activitiesController.deleteActivity);

export default router;
