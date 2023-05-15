const express = require('express');

const classController = require('../controllers/class');

const router = express.Router();

router
  .get('/', classController.getAllClasses)
  .get('/:id', classController.getClassesByID);

module.exports = router;
