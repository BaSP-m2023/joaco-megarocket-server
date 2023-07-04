import Joi from 'joi';

const RGXPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const validateCreation = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName: Joi.string().min(3).max(11).pattern(/^[a-zA-Z-]+$/)
      .required()
      .messages({ 'string.pattern.base': 'First name must contain letters or hyphens only' }),
    lastName: Joi.string().min(4).max(25).pattern(/^[a-zA-Z-]+$/)
      .required()
      .messages({ 'string.pattern.base': 'Last name must contain letters or hyphens only' }),
    dni: Joi.number().min(1000000).max(99999999)
      .required()
      .messages({ 'number.min': 'DNI must have 7-8 digits', 'number.max': 'DNI must have 7-8 digits' }),
    phone: Joi.number().min(1000000000).max(9999999999)
      .required()
      .messages({ 'number.min': 'Phone number must have 10 digits', 'number.max': 'Phone number must have 10 digits' }),
    email: Joi.string().email().required(),
    city: Joi.string().min(3).required(),
    birthday: Joi.date().required(),
    postalCode: Joi.number().min(1000).max(99999).required(),
    isActive: Joi.boolean(),
    membership: Joi.string().required(),
    password: Joi.string().regex(RGXPassword)
      .min(8)
      .regex(RGXPassword)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      }),
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
  const memberValidation = Joi.object({
    firstName: Joi.string().min(3).max(11).pattern(/^[a-zA-Z-]+$/)
      .messages({ 'string.pattern.base': 'First name must contain letters or hyphens only' }),
    lastName: Joi.string().min(4).max(25).pattern(/^[a-zA-Z-]+$/)
      .messages({ 'string.pattern.base': 'Last name must contain letters or hyphens only' }),
    dni: Joi.number().min(1000000).max(99999999)
      .messages({ 'number.min': 'DNI must have 7-8 digits', 'number.max': 'DNI must have 7-8 digits' }),
    phone: Joi.number().min(1000000000).max(9999999999)
      .messages({ 'number.min': 'Phone number must have 10 digits', 'number.max': 'Phone number must have 10 digits' }),
    email: Joi.string().email(),
    city: Joi.string().min(3),
    birthday: Joi.date().optional(),
    postalCode: Joi.number().min(1000).max(99999),
    isActive: Joi.boolean(),
    membership: Joi.string(),
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

const validations = {
  validateCreation,
  validateUpdate,
};

export default validations;
