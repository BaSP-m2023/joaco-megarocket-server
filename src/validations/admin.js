const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().min(4).required(),
    lastName: Joi.string().min(4).required(),
    dni: Joi.number().min(7).max(8).required(),
    phone: Joi.number().min(10).max(10).required(),
    email: Joi.string().email(),
    city: Joi.string().min(4).alphanum().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-zA-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]+$/).required(),
  });

  const validation = adminValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `Error: ${validation.error.details[0]}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
};
