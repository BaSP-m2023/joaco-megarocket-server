const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(11).required(),
    lastName: Joi.string().min(3).max(30).required(),
    dni: Joi.number().min(7).required(),
    phone: Joi.number().min(10).required(),
    email: Joi.string().email().required(),
    city: Joi.string().min(3).required(),
    password: Joi.string().required(),
    salary: Joi.number().required(),
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

module.exports = {
  validateCreation,
};
