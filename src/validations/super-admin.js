const joi = require('joi');

const RGXPassword = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';

const validateCreation = (req, res, next) => {
  const superAdminValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string()
      .min(8)
      .regex(RGXPassword)
      .required()
      .messages({
        'message.min': 'Password must be at least 8 characters',
        'message.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number        ',
      }),
  });

  const validation = superAdminValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: 'Error: password or email incorrect',
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
};
