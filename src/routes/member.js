import express from 'express';
import memberController from '../controllers/member';
import validations from '../validations/member';

const router = express.Router();

router
  .get('/', memberController.getAllMembers)
  .get('/:id', memberController.getMembersById)
  .post('/userLogin', validations.validateLogin, memberController.loginMember)
  .post('/', validations.validateCreation, memberController.createMember)
  .put('/:id', validations.validateUpdate, memberController.editMember)
  .delete('/:id', memberController.deleteMember);

export default router;
