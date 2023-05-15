const { default: mongoose } = require('mongoose');

const Trainer = require('../models/Trainer');

const getAllTrainer = (req, res) => {
  Trainer.find()
    .then((trainer) => {
      if (!trainer) {
        return res.status(404).json({
          message: 'Trainers not found',
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Trainers list',
        data: trainer,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred to find the trainers',
      error,
    }));
};

const getTrainerById = (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: 'Invalid id',
      error: true,
    });
  } else {
    Trainer.findById(id, 'firstName lastName email')
      .then((trainer) => {
        if (!trainer) {
          return res.status(404).json({
            message: `Trainer ID ${id} was not found`,
            error: true,
          });
        }
        return res.status(200).json({
          message: `Trainer found ${trainer.firstName} ${trainer.lastName}`,
          data: trainer,
          error: false,
        });
      })
      .catch((error) => res.status(400).json({
        message: `An error occurred to find the trainer with ID ${id}`,
        error,
      }));
  }
};
module.exports = {
  getAllTrainer,
  getTrainerById,
};
