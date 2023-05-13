const Class = require('../models/Class');

const createClass = (req, res) => {
  const {
    day, hour, trainer, activity, slots,
  } = req.body;

  Class.create({
    day,
    hour,
    trainer,
    activity,
    slots,
  }).then((result) => res.status(201).json({
    message: 'Class created',
    data: result,
    error: false,
  }))
    .catch((error) => res.status(400).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    }));
};

module.exports = {
  createClass,
};
