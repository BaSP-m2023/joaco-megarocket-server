const Joi = require('joi');

const createValidation = (req, res, next) => {
  const subscriptionValidation = Joi.object({
    classes: Joi.isSchema().required(),
    member: Joi.isSchema().required(),
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

module.exports = createValidation;
