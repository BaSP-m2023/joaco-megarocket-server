import express from 'express';
import subscriptionController from '../controllers/subscription';
import validations from '../validations/subscription';
import verifyToken from '../middleware/authMiddleware';

const router = express.Router();

router
  .get('/', (req, res, next) => verifyToken(req, res, [/* 'ADMIN',  */'MEMBER'], next), subscriptionController.getSubscriptions)
  .get('/:id', (req, res, next) => verifyToken(req, res, [/* 'ADMIN',  */'MEMBER'], next), subscriptionController.getSubscriptionsByID)
  .post('/', (req, res, next) => verifyToken(req, res, ['MEMBER'], next), validations.createValidation, subscriptionController.createSubscription)
  .put('/:id', /* (req, res, next) => verifyToken(req, res, ['SUPER_ADMIN'] *//* SUPER_ADMIN is here because nobody can do this put *//* , next), */ validations.updateValidation, subscriptionController.updateSubscription)
  .delete('/:id', (req, res, next) => verifyToken(req, res, [/* 'ADMIN',  */'MEMBER'], next), subscriptionController.deleteSubscription)
  .delete('/', subscriptionController.deleteOldSubscriptions);

export default router;
