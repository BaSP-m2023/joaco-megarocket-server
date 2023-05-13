const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const createAdmin = (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;
  Admin.create({
    firstName, lastName, dni, phone, email, city, password,
  })
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

const updateAdmin = (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      msg: 'Id is not a valid one',
      error: true,
    });
  }
  return Admin.findByIdAndUpdate(
    id,
    {
      firstName, lastName, dni, phone, email, city, password,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Admin with id ${id} was not found`,
          error: true,
        });
      }
      return res.status(200).json(result);
    })
    .catch((error) => res.status(400).json(error));
};

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

  Admin.findById(id)
    .then((admin) => res.status(200).json({
      message: `Admin found: it was ${admin.firstName}`,
      data: admin,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

module.exports = {
  createAdmin,
  updateAdmin,
  getAllAdmins,
  getAdminById,
};
