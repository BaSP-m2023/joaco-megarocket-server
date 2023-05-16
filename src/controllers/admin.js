const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const createAdmin = (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;
  Admin.findOne({ dni })
    .then((found) => {
      if (found) {
        return res.status(404).json({
          message: `An admin with DNI ${dni} already exists`,
          data: undefined,
          error: true,
        });
      }
      return Admin.create({
        firstName, lastName, dni, phone, email, city, password,
      });
    })
    .then((result) => res.status(201).json({
      message: 'New admin created',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: 'Id is not a valid one',
      data: undefined,
      error: true,
    });
  }
  const actualAdmin = await Admin.findById(id);
  const adminProperties = Object.keys(actualAdmin.toObject()).slice(1, -1);
  let changes = false;
  adminProperties.forEach((property) => {
    if (req.body[property]
    && req.body[property].toString() !== actualAdmin[property].toString()) {
      changes = true;
    }
  });
  if (!changes) {
    return res.status(200).json({
      message: 'There were no changes',
      data: undefined,
      error: false,
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
          message: `Admin with id ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(201).json({
        message: `Admin ${id} updated`,
        result,
        error: false,
      });
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
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      data: undefined,
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

  return Admin.findById(id)
    .then((admin) => res.status(200).json({
      message: `Admin user found: ${admin.firstName} ${admin.lastName}`,
      data: admin,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      data: undefined,
      error,
    }));
};

const deleteAdmin = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: 'Id is not a valid one',
      data: undefined,
      error: true,
    });
  }

  return Admin.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Admin with id ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(204).json();
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      data: undefined,
      error,
    }));
};

module.exports = {
  createAdmin,
  updateAdmin,
  getAllAdmins,
  getAdminById,
  deleteAdmin,
};
