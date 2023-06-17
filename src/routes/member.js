const express = require('express');

const router = express.Router();
const validation = require('../validations/member');
const memberController = require('../controllers/member');

router
  .get('/', memberController.getAllMembers)
  .get('/:id', memberController.getMembersById)
  .post('/userLogin', validation.validateLogin, memberController.loginMember)
  .post('/', validation.validateCreation, memberController.createMember)
  .put('/:id', validation.validateUpdate, memberController.editMember)
  .delete('/:id', memberController.deleteMember);

module.exports = router;
