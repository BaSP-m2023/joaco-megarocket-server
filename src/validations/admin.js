const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().min(4).max(25).required(),
    lastName: Joi.string().min(4).max(25).required(),
    dni: Joi.number().min(7).max(8).required(),
    phone: Joi.number().min(10).max(10).required(),
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

module.exports = {
  validateCreation,
};
