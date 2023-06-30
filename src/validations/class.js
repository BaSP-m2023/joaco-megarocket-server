import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const classValidation = Joi.object({
    day: Joi.string().min(6).max(9).required()
      .messages({
        'string.pattern.base': 'Day can only be Monday/Tuesday/Wednesday/Thursday/Friday/Saturday',
      }),
    hour: Joi.string().regex(/^((0[9]|1[0-9]|2[01]):00)$/)
      .required()
      .messages({
        'string.pattern.base': 'The classes always starts from 9:00 am to 21:00 pm sharp',
      }),
    trainer: Joi.required(),
    activity: Joi.required(),
    slots: Joi.number().positive().integer().min(3)
      .max(15)
      .optional(),
  });

  const validation = classValidation.validate(req.body);
  if (!validation.error) return next();

  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const classValidation = Joi.object({
    day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday').optional().messages({
      'string.pattern.base': 'Day can only be Monday/Tuesday/Wednesday/Thursday/Friday/Saturday',
    }),
    hour: Joi.string().regex(/^((0[9]|1[0-9]|2[01]):00)$/)
      .optional()
      .messages({
        'string.pattern.base': 'The classes always starts from 09:00 am to 21:00 pm sharp',
      }),
    trainer: Joi.optional(),
    activity: Joi.optional(),
    slots: Joi.number().positive().integer().min(3)
      .max(15)
      .optional(),
  }).min(1);

  const validation = classValidation.validate(req.body);
  if (!validation.error) return next();

  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validations = {
  validateCreation,
  validateUpdate,
};

export default validations;
