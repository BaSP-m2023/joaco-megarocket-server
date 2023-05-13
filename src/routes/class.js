const express = require('express');
const { validateCreation } = require('../validations/class');
const { createClass } = require('../controllers/class');

const router = express.Router();

router.post('/', validateCreation, createClass);

module.exports = router;
