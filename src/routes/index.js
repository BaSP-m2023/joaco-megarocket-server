import express from 'express';
import activities from './activity';
import classes from './class';
import members from './member';
import trainers from './trainer';
import admins from './admin';
import superAdmins from './super-admin';
import subscriptions from './subscription';
import authRouter from './auth';
import chat from './chat';

const router = express.Router();

router.use('/classes', classes);
router.use('/members', members);
router.use('/trainers', trainers);
router.use('/admins', admins);
router.use('/activities', activities);
router.use('/super-admin', superAdmins);
router.use('/subscriptions', subscriptions);
router.use('/auth', authRouter);
router.use('/ai', chat);

export default router;
