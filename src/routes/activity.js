const express = require('express');
const activitiesController = require('../controllers/activity');
const validations = require('../validations/activity');

const router = express.Router();

router
  .get('/', activitiesController.getAllActivities)
  .get('/:id', activitiesController.getActivityByID)
  .post('/', validations.createValidation, activitiesController.createActivity)
  .put('/:id', validations.updateValidation, activitiesController.updateActivity)
  .delete('/:id', activitiesController.deleteActivity);

module.exports = router;
