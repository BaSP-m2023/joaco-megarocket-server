import express from 'express';
import memberController from '../controllers/member';
import validations from '../validations/member';
import verifyToken from '../middleware/authMiddleware';

const router = express.Router();

router
  .get('/', (req, res, next) => verifyToken(req, res, ['ADMIN', 'TRAINER'], next), memberController.getAllMembers)
  .get('/:id', (req, res, next) => verifyToken(req, res, ['MEMBER', 'ADMIN', 'TRAINER'], next), memberController.getMembersById)
  .post('/', (req, res, next) => verifyToken(req, res, ['MEMBER'], next), validations.validateCreation, memberController.createMember)
  .put('/:id', (req, res, next) => verifyToken(req, res, ['ADMIN', 'MEMBER'], next), validations.validateUpdate, memberController.editMember)
  .delete('/:id', (req, res, next) => verifyToken(req, res, ['ADMIN', 'MEMBER'], next), memberController.deleteMember);

export default router;
