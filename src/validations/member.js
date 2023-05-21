const joi = require('joi');

const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4,}$/;

const validateCreation = (req, res, next) => {
  const memberValidation = joi.object({
    firstName: joi.string().min(3).max(11).pattern(/^[a-zA-Z-]+$/)
      .required()
      .messages({ 'string.pattern.base': 'First name must contain letters or hyphens only' }),
    lastName: joi.string().min(4).max(25).pattern(/^[a-zA-Z-]+$/)
      .required()
      .messages({ 'string.pattern.base': 'Last name must contain letters or hyphens only' }),
    dni: joi.number().min(1000000).max(99999999)
      .required()
      .messages({ 'number.min': 'DNI must have 7-8 digits', 'number.max': 'DNI must have 7-8 digits' }),
    phone: joi.number().min(1000000000).max(9999999999)
      .required()
      .messages({ 'number.min': 'Phone number must have 10 digits', 'number.max': 'Phone number must have 10 digits' }),
    email: joi.string().email().required(),
    city: joi.string().min(3).required(),
    birthday: joi.string().regex(dateRegex).required(),
    postalCode: joi.number().min(1000).max(99999).required(),
    isActive: joi.boolean(),
    membership: joi.string().required(),
  });

  const validation = memberValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }

  return next();
};

const validateUpdate = (req, res, next) => {
  const memberValidation = joi.object({
    firstName: joi.string().min(3).max(11).pattern(/^[a-zA-Z-]+$/)
      .messages({ 'string.pattern.base': 'First name must contain letters or hyphens only' }),
    lastName: joi.string().min(4).max(25).pattern(/^[a-zA-Z-]+$/)
      .messages({ 'string.pattern.base': 'Last name must contain letters or hyphens only' }),
    dni: joi.number().min(1000000).max(99999999)
      .messages({ 'number.min': 'DNI must have 7-8 digits', 'number.max': 'DNI must have 7-8 digits' }),
    phone: joi.number().min(1000000000).max(9999999999)
      .messages({ 'number.min': 'Phone number must have 10 digits', 'number.max': 'Phone number must have 10 digits' }),
    email: joi.string().email(),
    city: joi.string().min(3),
    birthday: joi.string().regex(dateRegex),
    postalCode: joi.number().min(1000).max(99999),
    isActive: joi.boolean(),
    membership: joi.string(),
  });

  const validation = memberValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }

  return next();
};

module.exports = {
  validateCreation,
  validateUpdate,
};
