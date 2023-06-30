import express from 'express';
import classController from '../controllers/class';
import validations from '../validations/class';
import verifyToken from '../middleware/authMiddleware';

const router = express.Router();

router
  .get('/', (req, res, next) => verifyToken(req, res, ['ADMIN', 'TRAINER', 'MEMBER'], next), classController.getAllClasses)
  .get('/:id', (req, res, next) => verifyToken(req, res, ['ADMIN', 'TRAINER', 'MEMBER'], next), classController.getClassesByID)
  .post('/', (req, res, next) => verifyToken(req, res, ['ADMIN'], next), validations.validateCreation, classController.createClass)
  .delete('/:id', (req, res, next) => verifyToken(req, res, ['ADMIN'], next), classController.deleteClass)
  .put('/:id', (req, res, next) => verifyToken(req, res, ['ADMIN'], next), validations.validateUpdate, classController.updateClass);

export default router;
