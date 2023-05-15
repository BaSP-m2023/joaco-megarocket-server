const Class = require('../models/Class');

const getAllClasses = (req, res) => {
  Class.find()
    .then((result) => res.status(200).json({
      message: 'Classes list completed',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      data: undefined,
      error,
    }));
};

const getClassesByID = (req, res) => {
  const { id } = req.params;

  Class.findById(id)
    .then((result) => res.status(200).json({
      message: `Class with ID ${id} was found`,
      data: result,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      data: undefined,
      error,
    }));
};

module.exports = { getAllClasses, getClassesByID };
