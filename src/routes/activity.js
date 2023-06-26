import express from 'express';
import activitiesController from '../controllers/activity';
import validations from '../validations/activity';

const router = express.Router();

router
  .get('/', activitiesController.getAllActivities)
  .get('/:id', activitiesController.getActivityByID)
  .post('/', validations.createValidation, activitiesController.createActivity)
  .put('/:id', validations.updateValidation, activitiesController.updateActivity)
  .delete('/:id', activitiesController.deleteActivity);

export default router;
