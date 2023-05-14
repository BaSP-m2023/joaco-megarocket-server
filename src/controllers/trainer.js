const { default: mongoose } = require('mongoose');
const Trainer = require('../models/Trainer');

const createTrainer = (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password, salary, isActive,
  } = req.body;

  Trainer.create({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    password,
    salary,
    isActive,
  })

    .then((newTrainer) => res.status(201).json({
      message: 'Trainer created successfuly',
      data: newTrainer,
      error: false,
    }))

    .catch((error) => res.status(400).json({
      message: 'Failed to create a Trainer',
      error,
    }));
};

const updateTrainer = (req, res) => {
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

  return Trainer.findByIdAndUpdate(
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
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Trainer with the id: ${id} was not fount`,
        });
      }
      return res.status(201).json(result);
    })
    .catch((error) => res.status(400).json(error));
};

const deleteTrainer = (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: id,
      error: true,
    });
  }

  return Trainer.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Trainer with ID: ${id} was not found`,
        });
      }
      return res.status(204).json({
        message: 'Trainer success deleted!',
      });
    })
    .catch((error) => res.status(400).json(error));
};

module.exports = {
  createTrainer,
  updateTrainer,
  deleteTrainer,
};
