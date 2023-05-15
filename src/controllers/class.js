const mongoose = require('mongoose');
const Class = require('../models/Class');

const createClass = (req, res) => {
  const {
    day, hour, trainer, activity, slots,
  } = req.body;

  Class.findOne({ day, hour })
    .then((classExists) => {
      if (classExists) {
        return res.status(400).json({
          message: `Class of day ${day} and hour ${hour} already exists`,
          data: undefined,
          error: true,
        });
      }
      return Class.create({
        day,
        hour,
        trainer,
        activity,
        slots,
      }).then((result) => res.status(201).json({
        message: 'Class created',
        data: result,
        error: false,
      }));
    })
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
      return res.status(204).json({});
    })
    .catch((error) => res.status(400).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    }));
};

const updateClass = (req, res) => {
  const { id } = req.params;
  const {
    day, hour, trainer, activity, slots,
  } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: `Format of ID ${id} is incorrect`,
      data: undefined,
      error: true,
    });
  }
  return Class.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Class with ID ${id} was not found`,
          data: undefined,
          error: true,
        });
      }

      const updatedClass = {
        ...result.toObject(),
        ...req.body,
      };

      if (JSON.stringify(result) === JSON.stringify(updatedClass)) {
        return res.status(200).json({
          message: 'No changes were made to the class',
          data: updatedClass,
          error: true,
        });
      }

      return Class.findByIdAndUpdate(id, {
        day,
        hour,
        trainer,
        activity,
        slots,
      }, { new: true })
        .then((data) => res.status(201).json({
          message: 'Class updated',
          data,
          error: false,
        }));
    })
    .catch((error) => res.status(400).json({
      message: `An error occurred: ${error}`,
      data: undefined,
      error: true,
    }));
};

module.exports = {
  createClass,
  deleteClass,
  updateClass,
};
