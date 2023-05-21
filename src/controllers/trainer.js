const { default: mongoose } = require('mongoose');
const Trainer = require('../models/Trainer');

const createTrainer = async (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password, salary, isActive,
  } = req.body;

  try {
    const found = await Trainer.findOne({ $or: [{ dni }, { email }] });

    if (found) {
      throw Error(`The admin with DNI ${dni} or Email ${email} already exists`);
    }

    const newTrainer = await Trainer.create({
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
      salary,
      isActive,
    });

    return res.status(201).json({
      message: 'Trainer created successfuly',
      data: newTrainer,
      error: false,
    });
  } catch (error) {
    if (error.message === `The admin with DNI ${dni} or Email ${email} already exists`) {
      return res.status(400).json({
        message: error.message,
        data: undefined,
        error: true,
      });
    }

    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const updateTrainer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: id,
      error: true,
    });
  }

  const {
    firstName, lastName, dni, phone, email, city, password, salary, isActive,
  } = req.body;

  try {
    const actualTrainer = await Trainer.findById(id);

    if (!actualTrainer) {
      return res.status(404).json({
        message: `The trainer with the ID: ${id} doesn't exists`,
        data: undefined,
        error: true,
      });
    }
    const valuesChanged = Object.entries({
      firstName, lastName, dni, phone, email, city, password, salary, isActive,
    }).some(([key, value]) => actualTrainer[key] !== value);

    if (!valuesChanged) {
      return res.status(200).json({
        message: 'No changes were made',
        data: actualTrainer,
        error: false,
      });
    }

    const trainerUpdate = await Trainer.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        dni,
        phone,
        email,
        city,
        password,
        salary,
        isActive,
      },
      { new: true },
    );
    return res.status(201).json({
      message: 'Trainer updated succesfully',
      data: trainerUpdate,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteTrainer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: id,
      error: true,
    });
  }

  try {
    const trainerDelete = await Trainer.findByIdAndDelete(id);

    if (!trainerDelete) {
      return res.status(404).json({
        message: `Trainer with ID: ${id} was not found`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Trainer successfully deleted!',
      data: trainerDelete,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      data: undefined,
      error,
    });
  }
};

const getAllTrainer = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    if (!trainers) {
      return res.status(404).json({
        message: 'Trainers not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainers list',
      data: trainers,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred to find the trainers',
      data: undefined,
      error: true,
    });
  }
};

const getTrainerById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid id',
      data: undefined,
      error: true,
    });
  }
  try {
    const trainer = await Trainer.findById(id, 'firstName lastName email');
    if (!trainer) {
      return res.status(404).json({
        message: `Trainer ID ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Trainer found ${trainer.firstName} ${trainer.lastName}`,
      data: trainer,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error occurred to find the trainer with ID ${id}`,
      data: undefined,
      error,
    });
  }
};

module.exports = {
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getAllTrainer,
  getTrainerById,
};
