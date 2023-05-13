const express = require('express');

const router = express.Router();
const validation = require('../validations/member');
const memberController = require('../controllers/member');

router
  .post('/', validation.validateCreation, memberController.createMember)
  .put('/:id', memberController.editMember)
  .delete('/:id', memberController.deleteMember);
module.exports = router;
