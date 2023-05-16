const Joi = require('joi');

const createValidation = (req, res, next) => {
  const subscriptionValidation = Joi.object({
    classes: Joi.string().alphanum().length(24).required(),
    member: Joi.string().alphanum().length(24).required(),
    date: Joi.date(),
  });

  const validation = subscriptionValidation.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      error: true,
      message: `Error: ${validation.error.details[0].message}`,
      data: undefined,
    });
  } else {
    next();
  }
};

const updateValidation = (req, res, next) => {
  const subscriptionValidation = Joi.object({
    classes: Joi.string().alphanum().length(24),
    member: Joi.string().alphanum().length(24),
    date: Joi.date(),
  });

  const validation = subscriptionValidation.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      error: true,
      message: `Error: ${validation.error.details[0].message}`,
      data: undefined,
    });
  } else {
    next();
  }
};

module.exports = { createValidation, updateValidation };
