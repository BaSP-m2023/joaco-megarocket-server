const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().min(2).max(25).pattern(/^[a-zA-Z-]+$/)
      .required()
      .messages({ 'string.pattern.base': 'First name must contain letters or hyphens only' }),
    lastName: Joi.string().min(2).max(25).pattern(/^[a-zA-Z-]+$/)
      .required()
      .messages({ 'string.pattern.base': 'Last name must contain letters or hyphens only' }),
    dni: Joi.number().min(1000000).max(99999999).required()
      .messages({ 'number.min': 'DNI must have 7-8 digits', 'number.max': 'DNI must have 7-8 digits' }),
    phone: Joi.number().min(1000000000).max(9999999999).required()
      .messages({ 'number.min': 'Phone number must have 10 digits', 'number.max': 'Phone number must have 10 digits' }),
    email: Joi.string().email().required(),
    city: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
  });

  const validation = adminValidation.validate(req.body);

  if (!validation.error) return next();
  const errorMessages = validation.error.details.map((detail) => detail.message);
  return res.status(400).json({
    message: `There was an error: ${errorMessages.join(', ')}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().min(4).max(25).pattern(/^[a-zA-Z-]+$/)
      .messages({ 'string.pattern.base': 'First name must contain letters or hyphens only' }),
    lastName: Joi.string().min(4).max(25).pattern(/^[a-zA-Z-]+$/)
      .messages({ 'string.pattern.base': 'Last name must contain letters or hyphens only' }),
    dni: Joi.number().min(1000000).max(99999999)
      .messages({ 'number.min': 'DNI must have 7-8 digits', 'number.max': 'DNI must have 7-8 digits' }),
    phone: Joi.number().min(1000000000).max(9999999999)
      .messages({ 'number.min': 'Phone number must have 10 digits', 'number.max': 'Phone number must have 10 digits' }),
    email: Joi.string().email(),
    city: Joi.string().min(4),
    password: Joi.string().min(8),
  });

  const validation = adminValidation.validate(req.body);

  if (!validation.error) return next();
  const errorMessages = validation.error.details.map((detail) => detail.message);
  return res.status(400).json({
    message: `There was an error: ${errorMessages.join(', ')}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
  validateUpdate,
};
