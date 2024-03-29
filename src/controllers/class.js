/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import Class from '../models/Class';
import Activity from '../models/Activity';
import Trainer from '../models/Trainer';

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('activity trainer', {
      firstName: 1,
      lastName: 1,
      dni: 1,
      isActive: 1,
      name: 1,
      description: 1,
    });
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
      isActive: 1,
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
      message: 'Class successfully deleted!',
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
      isActive: 1,
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
      message: 'Class was updated successfully!',
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

const deleteOldClasses = async (req, res) => {
  try {
    const trainers = (await Trainer.find()).map((trainer) => trainer._id);
    const activities = (await Activity.find()).map((activity) => activity._id);

    const inactiveTrainers = await Trainer.find({ isActive: false });

    const oldClasses = await Class.deleteMany({
      $or: [
        { trainer: { $exists: false } },
        { activity: { $exists: false } },
        { trainer: { $nin: trainers } },
        { activity: { $nin: activities } },
        { trainer: { $in: inactiveTrainers } },
      ],
    });

    return res.status(200).json({
      error: false,
      message: 'Old classes deleted successfully!',
      data: oldClasses,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
      data: undefined,
    });
  }
};

const classController = {
  getAllClasses,
  getClassesByID,
  createClass,
  deleteClass,
  updateClass,
  deleteOldClasses,
};

export default classController;
