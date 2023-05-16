const joi = require('joi');

const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4,}$/;

const validateCreation = (req, res, next) => {
  const memberValidation = joi.object({
    firstName: joi.string().min(3).max(11).required(),
    lastName: joi.string().min(3).max(30).required(),
    dni: joi.number().min(1000000).max(99999999).required(),
    phone: joi.number().min(1000000000).max(9999999999).required(),
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

module.exports = {
  validateCreation,
};
