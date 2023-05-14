const Trainer = require('../models/Trainer');

const getAllTrainer = (req, res) => {
  Trainer.find()
    .then((trainer) => {
      if (!trainer) {
        return res.status(404).json({
          message: 'Trainer not found',
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Trainer list',
        data: trainer,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error,
    }));
};

module.exports = {
  getAllTrainer,
};
