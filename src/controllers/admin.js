import mongoose from 'mongoose';
import Admin from '../models/Admin';

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

const createAdmin = async (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;
  try {
    const dniExists = await Admin.findOne({ dni });
    const emailExists = await Admin.findOne({ email });
    if (dniExists) {
      return res.status(400).json({
        message: 'An admin with that DNI already exists',
        data: undefined,
        error: true,
      });
    }
    if (emailExists) {
      return res.status(400).json({
        message: 'An admin with that Email already exists',
        data: undefined,
        error: true,
      });
    }
    const result = await Admin.create({
      firstName, lastName, dni, phone, email, city, password,
    });
    return res.status(201).json({
      message: 'Admin was created successfully!',
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
      return res.status(400).json({
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
    const adminProps = Object.keys(actualAdmin.toObject()).slice(1, -1);
    let changes = false;
    adminProps.forEach((prop) => {
      if (req.body[prop] && req.body[prop] !== actualAdmin[prop].toString()) {
        changes = true;
      }
    });

    if (!changes) {
      return res.status(400).json({
        message: 'There were no changes',
        data: actualAdmin,
        error: true,
      });
    }

    const anAdminAlreadyHasDni = await Admin.findOne({
      $and: [
        {
          $or: [{ dni }],
        },
        {
          _id: { $ne: id },
        },
      ],
    });

    if (anAdminAlreadyHasDni) {
      return res.status(400).json({
        message: 'There is another admin with that DNI.',
        data: req.body,
        error: true,
      });
    }

    const anAdminAlreadyHasEmail = await Admin.findOne({
      $and: [
        {
          $or: [{ email }],
        },
        {
          _id: { $ne: id },
        },
      ],
    });

    if (anAdminAlreadyHasEmail) {
      return res.status(400).json({
        message: 'There is another admin with that email.',
        data: req.body,
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

    return res.status(200).json({
      message: 'Admin was updated successfully!',
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

const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
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
    return res.status(200).json({
      message: 'Admin successfully deleted!',
      data: admin,
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

const adminsController = {
  createAdmin,
  updateAdmin,
  getAllAdmins,
  getAdminById,
  deleteAdmin,
};

export default adminsController;
