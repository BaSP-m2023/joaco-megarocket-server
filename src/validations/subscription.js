const Joi = require('joi');

const createValidation = (req, res, next) => {
  const subscriptionValidation = Joi.object({
    classes: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    member: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    date: Joi.date().optional(),
  });

  const validation = subscriptionValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      error: true,
      message: `Error: ${validation.error.details[0].message}`,
      data: undefined,
    });
  }
  return next();
};

const updateValidation = (req, res, next) => {
  const subscriptionValidation = Joi.object({
    classes: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(),
    member: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(),
    date: Joi.date().optional(),
  });

  const validation = subscriptionValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      error: true,
      message: `Error: ${validation.error.details[0].message}`,
      data: undefined,
    });
  }
  return next();
};

module.exports = { createValidation, updateValidation };
