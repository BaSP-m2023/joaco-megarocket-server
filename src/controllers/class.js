const mongoose = require('mongoose');
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

const deleteClass = (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: `Format of ID ${id} is incorrect`,
      data: undefined,
      error: true,
    });
  }

  return Class.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Class with ID ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(204).end();
    })
    .catch((error) => res.status(400).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    }));
};

module.exports = {
  createClass,
  deleteClass,
};
