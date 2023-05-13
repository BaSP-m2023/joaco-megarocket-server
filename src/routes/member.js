const express = require('express');

const router = express.Router();
const memberController = require('../controllers/member');

router
  .get('/', memberController.getAllMembers)
  .get('/id', memberController.getMembersById);

module.exports = router;
