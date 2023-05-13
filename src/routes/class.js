const express = require('express');
const { validateCreation } = require('../validations/class');
const { createClass, deleteClass } = require('../controllers/class');

const router = express.Router();

router
  .post('/', validateCreation, createClass)
  .delete('/:id', deleteClass);

module.exports = router;
