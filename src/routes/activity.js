const express = require('express');
const activitiesController = require('../controllers/activity');

const router = express.Router();

router
  .get('/', activitiesController.getAllActivities)
  .get('/:id', activitiesController.getActivityByID)
  .post('/', activitiesController.createActivity)
  .put('/:id', activitiesController.updateActivity)
  .delete('/:id', activitiesController.deleteActivity);

module.exports = router;
