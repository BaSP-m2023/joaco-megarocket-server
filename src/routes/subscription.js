const express = require('express');
const subscriptionController = require('../controllers/subscription');
const validations = require('../validations/subscription');

const router = express.Router();

router
  .get('/', subscriptionController.getSubscriptions)
  .get('/:id', subscriptionController.getSubscriptionsByID)
  .post('/', validations.createValidation, subscriptionController.createSubscription)
  .put('/:id', validations.updateValidation, subscriptionController.updateSubscription)
  .delete('/:id', subscriptionController.deleteSubscription);

module.exports = router;
