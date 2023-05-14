const express = require('express');

const router = express.Router();
const trainerController = require('../controllers/trainer');

router
  .get('/', trainerController.getAllTrainer);

module.exports = router;
