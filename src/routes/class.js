const express = require('express');

const classController = require('../controllers/class');
const { validateCreation, validateUpdate } = require('../validations/class');

const router = express.Router();

router
  .get('/', classController.getAllClasses)
  .get('/:id', classController.getClassesByID)
  .post('/', validateCreation, classController.createClass)
  .delete('/:id', classController.deleteClass)
  .put('/:id', validateUpdate, classController.updateClass);

module.exports = router;
