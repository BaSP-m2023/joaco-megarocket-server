const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const createAdmin = async (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;
  try {
    const found = await Admin.findOne({ dni });
    if (found) {
      return res.status(404).json({
        message: `An admin with DNI ${dni} already exists`,
        data: undefined,
        error: true,
      });
    }
    const result = await Admin.create({
      firstName, lastName, dni, phone, email, city, password,
    });
    return res.status(201).json({
      message: 'New admin created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: 'Id is not a valid one',
        data: undefined,
        error: true,
      });
    }

    const actualAdmin = await Admin.findById(id);
    if (!actualAdmin) {
      return res.status(404).json({
        message: `Admin with id ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
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
    const found = await Admin.findOne({ dni });
    if (found) {
      return res.status(404).json({
        message: `An admin with DNI ${dni} already exists`,
        data: undefined,
        error: true,
      });
    }
    const result = await Admin.findByIdAndUpdate(
      id,
      {
        firstName, lastName, dni, phone, email, city, password,
      },
      { new: true },
    );
    /* if (!result) {
      return res.status(404).json({
        message: `Admin with id ${id} was not found`,
        data: undefined,
        error: true,
      });
    } */

    return res.status(201).json({
      message: `Admin ${id} updated`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    return res.status(200).json({
      message: 'Complete admin list',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Id is not a valid one',
      data: undefined,
      error: true,
    });
  }
  try {
    const admin = await Admin.findById(id);
    if (admin) {
      return res.status(200).json({
        message: `Admin user found: ${admin.firstName} ${admin.lastName}`,
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with id ${id} was not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: 'Id is not a valid one',
        data: undefined,
        error: true,
      });
    }
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({
        message: `Admin with id ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};
module.exports = {
  createAdmin,
  updateAdmin,
  getAllAdmins,
  getAdminById,
  deleteAdmin,
};
