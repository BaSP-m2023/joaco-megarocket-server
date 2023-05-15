const joi = require('joi');

const RGXPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const validateCreation = (req, res, next) => {
  const superAdminValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().regex(RGXPassword)
      .min(8)
      .regex(RGXPassword)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      }),
  });

  const validationCreate = superAdminValidation.validate(req.body);

  if (!validationCreate.error) return next();
  return res.status(400).json({
    message: `Error: ${validationCreate.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const superAdminUpdate = joi.object({
    email: joi.string().email(),
    password: joi.string()
      .min(8)
      .regex(RGXPassword)
      .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      }),
  });

  const validationUpdate = superAdminUpdate.validate(req.body);

  if (!validationUpdate.error) return next();
  return res.status(400).json({
    message: `Error: ${validationUpdate.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
  validateUpdate,
};
