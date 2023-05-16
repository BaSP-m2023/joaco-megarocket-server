const express = require('express');
const { validateCreation, validateUpdate } = require('../validations/class');
const { createClass, deleteClass, updateClass } = require('../controllers/class');

const router = express.Router();

router
  .post('/', validateCreation, createClass)
  .delete('/:id', deleteClass)
  .put('/:id', validateUpdate, updateClass);

module.exports = router;
