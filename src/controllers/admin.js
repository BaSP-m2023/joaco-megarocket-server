/* eslint-disable consistent-return */
const { default: mongoose } = require('mongoose');
const Admin = require('../models/Admin');

const getAllAdmins = (req, res) => {
  Admin.find()
    .then((admins) => res.status(200).json({
      message: 'Complete admin list',
      data: admins,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

const getAdminById = (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'The indicated ID is invalid',
      data: id,
      error: true,
    });
  }

  Admin.findById(id)
    .then((admin) => res.status(200).json({
      message: `Admin user found: ${admin.firstName} ${admin.lastName}`,
      data: admin,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error,
    }));
};

module.exports = {
  getAllAdmins,
  getAdminById,
};
