const mongoose = require('mongoose');
const Class = require('../models/Class');

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
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

  try {
    const classFound = await Class.findById(id);
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
  try {
    const classExists = await Class.findOne({ day, hour });
    if (classExists) {
      return res.status(400).json({
        message: `Class of day ${day} and hour ${hour} already exists`,
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
    return res.status(201).json({
      message: 'Class created',
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
    const classFound = await Class.findByIdAndDelete(id);
    if (!classFound) {
      return res.status(404).json({
        message: `Class with ID ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json({});
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
    const modifiedClass = await Class.findByIdAndUpdate(id, {
      day,
      hour,
      trainer,
      activity,
      slots,
    }, { new: true });
    return res.status(201).json({
      message: 'Class updated',
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
