const express = require('express');

const router = express.Router();
const validation = require('../validations/member');
const memberController = require('../controllers/member');

router
  .post('/', validation.validateCreation, memberController.createMember);

module.exports = router;
