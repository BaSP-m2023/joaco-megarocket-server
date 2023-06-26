import express from 'express';
import classController from '../controllers/class';
import validations from '../validations/class';

const router = express.Router();

router
  .get('/', classController.getAllClasses)
  .get('/:id', classController.getClassesByID)
  .post('/', validations.validateCreation, classController.createClass)
  .delete('/:id', classController.deleteClass)
  .put('/:id', validations.validateUpdate, classController.updateClass);

export default router;
