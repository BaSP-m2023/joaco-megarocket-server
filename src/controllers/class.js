const mongoose = require('mongoose');
const Class = require('../models/Class');
const Activity = require('../models/Activity');
const Trainer = require('../models/Trainer');

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('activity trainer', {
      firstName: 1,
      lastName: 1,
      dni: 1,
      name: 1,
      description: 1,
    });
    if (classes.length === 0) {
      return res.status(404).json({
        message: 'There is no data',
        data: classes,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Classes list completed',
      data: classes,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const getClassesByID = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: `Format of ID ${id} is incorrect`,
      data: undefined,
      error: true,
    });
  }

  try {
    const classFound = await Class.findById(id).populate('activity trainer', {
      firstName: 1,
      lastName: 1,
      dni: 1,
      name: 1,
      description: 1,
    });
    if (!classFound) {
      return res.status(404).json({
        message: `Class with ID ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Class with ID ${id} was found`,
      data: classFound,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const createClass = async (req, res) => {
  const {
    day, hour, trainer, activity, slots,
  } = req.body;

  if (!mongoose.isValidObjectId(trainer) || !mongoose.isValidObjectId(activity)) {
    return res.status(400).json({
      message: 'Activity and Trainer should refer to a valid ID',
      data: undefined,
      error: true,
    });
  }

  try {
    const classExists = await Class.findOne({ day, hour });
    if (classExists) {
      return res.status(400).json({
        message: `Class of day ${day} and hour ${hour} already exists`,
        data: undefined,
        error: true,
      });
    }
    const activityExists = await Activity.findOne({ _id: activity });
    const trainerExists = await Trainer.findOne({ _id: trainer });

    if (!activityExists || !trainerExists) {
      return res.status(404).json({
        message: 'Activity or Trainer was not found',
        data: undefined,
        error: true,
      });
    }
    const result = await Class.create({
      day,
      hour,
      trainer,
      activity,
      slots,
    });

    await Class.populate(result, { path: 'activity trainer' });

    return res.status(201).json({
      message: 'Class was created successfully!',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteClass = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: `Format of ID ${id} is incorrect`,
      data: undefined,
      error: true,
    });
  }

  try {
    const classFound = await Class.findByIdAndDelete(id).populate('activity trainer', {
      firstName: 1,
      lastName: 1,
      dni: 1,
      name: 1,
      description: 1,
    });
    if (!classFound) {
      return res.status(404).json({
        message: 'Class was not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Class deleted successfully',
      data: classFound,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const updateClass = async (req, res) => {
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

  try {
    const result = await Class.findById(id);

    if (!result) {
      return res.status(404).json({
        message: 'Class was not found',
        data: undefined,
        error: true,
      });
    }
    if (trainer || activity) {
      if (!mongoose.isValidObjectId(trainer) || !mongoose.isValidObjectId(activity)) {
        return res.status(400).json({
          message: 'Activity and Trainer should refer to a valid ID',
          data: undefined,
          error: true,
        });
      }
      const activityExists = await Activity.findOne({ _id: activity });
      const trainerExists = await Trainer.findOne({ _id: trainer });

      if (!activityExists || !trainerExists) {
        return res.status(404).json({
          message: 'Activity or Trainer was not found',
          data: undefined,
          error: true,
        });
      }
    }
    const classExists = await Class.findOne({
      $and: [
        {
          $and: [{ day }, { hour }],
        },
        {
          _id: { $ne: id },
        },
      ],
    });
    if (classExists) {
      return res.status(400).json({
        message: `Class of day ${day} and hour ${hour} already exists`,
        data: req.body,
        error: true,
      });
    }
    const updatedClass = {
      ...result.toObject(),
      ...req.body,
    };

    const modifiedClass = await Class.findByIdAndUpdate(id, {
      day,
      hour,
      trainer,
      activity,
      slots,
    }, { new: true }).populate('activity trainer', {
      firstName: 1,
      lastName: 1,
      dni: 1,
      name: 1,
      description: 1,
    });

    if (JSON.stringify(result) === JSON.stringify(updatedClass)) {
      return res.status(400).json({
        message: 'There were no changes',
        data: modifiedClass,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Class edited successfully!',
      data: modifiedClass,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error occurred: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

module.exports = {
  getAllClasses,
  getClassesByID,
  createClass,
  deleteClass,
  updateClass,
};
