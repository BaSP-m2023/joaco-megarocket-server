import express from 'express';
import eventChat from '../controllers/chat';

const router = express.Router();

router
  .post('/', eventChat);

export default router;
