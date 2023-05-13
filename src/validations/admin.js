const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().min(2).max(25).required(),
    lastName: Joi.string().min(2).max(25).required(),
    dni: Joi.number().min(1000000).max(99999999).required(),
    phone: Joi.number().min(1000000000).max(9999999999).required(),
    email: Joi.string().email().required(),
    city: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
  });

  const validation = adminValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().min(4).max(25),
    lastName: Joi.string().min(4).max(25),
    dni: Joi.number().min(1000000).max(99999999),
    phone: Joi.number().min(1000000000).max(9999999999),
    email: Joi.string().email(),
    city: Joi.string().min(4),
    password: Joi.string().min(8),
  });

  const validation = adminValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
  validateUpdate,
};
