import Joi from 'joi';

const RGXPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const validateCreation = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(11).regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .required()
      .messages({
        'string.pattern.base': 'Name must contain only letters',
      }),
    lastName: Joi.string().min(3).max(30).regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .required()
      .messages({
        'string.pattern.base': 'Last name must contain only letters',
      }),
    dni: Joi.number().min(1000000).max(99999999).required(),
    phone: Joi.number().min(1000000000).max(9999999999).required(),
    email: Joi.string().email().required(),
    city: Joi.string().min(3).regex(/^[a-zA-Z\s.,]+$/).required(),
    password: Joi.string().regex(RGXPass)
      .min(8)
      .regex(RGXPass)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      }),
    salary: Joi.number().min(1).required(),
    isActive: Joi.boolean(),
  });

  const validation = trainerValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(11).regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .messages({
        'string.pattern.base': 'Name must contain only letters',
      }),
    lastName: Joi.string().min(3).max(30).regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .messages({
        'string.pattern.base': 'Last name must contain only letters',
      }),
    dni: Joi.number().min(1000000).max(999999999),
    phone: Joi.number().min(1000000000).max(9999999999),
    email: Joi.string().email(),
    city: Joi.string().min(3).regex(/^[a-zA-Z\s.,]+$/),
    password: Joi.string().regex(RGXPass)
      .min(8)
      .regex(RGXPass)
      .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      }),
    salary: Joi.number().min(1),
    isActive: Joi.boolean(),
  });

  const validation = trainerValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validations = {
  validateCreation,
  validateUpdate,
};

export default validations;
