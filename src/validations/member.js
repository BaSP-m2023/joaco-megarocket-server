const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName: Joi.string().min(3).max(11).required(),
    lastName: Joi.string().min(3).max(30).required(),
    dni: Joi.number().min(7).required(),
    phone: Joi.number().min(10).required(),
    email: Joi.string().email().required(),
    city: Joi.string().min(3).required(),
    birthday: Joi.date().required(),
    postal_code: Joi.number().min(4).required(),
    is_active: Joi.boolean(),
    membership: Joi.string().required(),
  });

  const validation = memberValidation.validate(req.body);
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
