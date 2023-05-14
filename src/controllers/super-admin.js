const SuperAdmin = require('../models/Super-admin');

const getAllSuperAdmins = (req, res) => {
  SuperAdmin.find()
    .then((superAdmins) => res.status(200).json({
      message: 'Succesfully',
      data: superAdmins,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

const getSuperAdminsById = (req, res) => {
  const { id } = req.params;

  if (id) {
    SuperAdmin.findById(id, 'email')
      .then((superAdmins) => res.status(200).json({
        message: 'Super admin found',
        data: superAdmins,
        error: false,
      }))
      .catch((error) => res.status(400).json({
        message: 'An error ocurred',
        error,
      }));
  } else {
    res.status(404).json({
      message: 'Id not found',
      error: true,
    });
  }
};

module.exports = {
  getAllSuperAdmins,
  getSuperAdminsById,
};
