import express from 'express';
import getAuth from '../controllers/auth';
import memberController from '../controllers/member';
import memberValidations from '../validations/member';
import trainerValidations from '../validations/trainer';
import adminValidations from '../validations/admin';
import superAdminValidations from '../validations/super-admin';
import superAdminController from '../controllers/super-admin';
import trainerController from '../controllers/trainer';
import adminsController from '../controllers/admin';

const authRouter = express.Router();

authRouter
  .get('/login', getAuth)
  .post('/register/members', memberValidations.validateCreation, memberController.createMember)
  .post('/register/admins', adminValidations.validateCreation, adminsController.createAdmin)
  .post('/register/super-admins', superAdminValidations.validateCreation, superAdminController.createSuperAdmin)
  .post('/register/trainers', trainerValidations.validateCreation, trainerController.createTrainer);

export default authRouter;
