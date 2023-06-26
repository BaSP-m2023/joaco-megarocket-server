import express from 'express';
import subscriptionController from '../controllers/subscription';
import validations from '../validations/subscription';

const router = express.Router();

router
  .get('/', subscriptionController.getSubscriptions)
  .get('/:id', subscriptionController.getSubscriptionsByID)
  .post('/', validations.createValidation, subscriptionController.createSubscription)
  .put('/:id', validations.updateValidation, subscriptionController.updateSubscription)
  .delete('/:id', subscriptionController.deleteSubscription)
  .delete('/', subscriptionController.deleteOldSubscriptions);

export default router;
