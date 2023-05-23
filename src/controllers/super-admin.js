const { default: mongoose } = require('mongoose');
const SuperAdmin = require('../models/Super-admin');

const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmin.find();

    if (superAdmins.length > 0) {
      return res.status(200).json({
        message: 'Successfully',
        data: superAdmins,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'There are no super admins yet',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// eslint-disable-next-line consistent-return
const getSuperAdminsById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: 'Id no valid',
      data: undefined,
      error: true,
    });
  } else {
    try {
      const findByIdSuperAdmin = await SuperAdmin.findById(id, 'email');

      if (!findByIdSuperAdmin) {
        return res.status(404).json({
          message: `This super admins with id: ${id} not exist`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Super admin found',
        data: findByIdSuperAdmin,
        error: false,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        data: undefined,
        error: true,
      });
    }
  }
};

// eslint-disable-next-line consistent-return
const createSuperAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findEmail = await SuperAdmin.findOne({ email });

    if (!findEmail) {
      const superAdminCreate = await SuperAdmin.create({ email, password });

      if (superAdminCreate) {
        return res.status(201).json({
          message: 'Succesfully created',
          data: superAdminCreate,
          error: false,
        });
      }
    } else {
      return res.status(400).json({
        message: `The user with email ${email} already exist`,
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// eslint-disable-next-line consistent-return
const deleteAdminsById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: 'Id not valid',
      data: undefined,
      error: true,
    });
  } else {
    try {
      const superAdminDeleted = await SuperAdmin.deleteOne({ _id: id });

      if (superAdminDeleted) {
        return res.status(200).json({
          message: `This super admins with id: ${id} was deleted successfully`,
          data: undefined,
          error: false,
        });
      }
      return res.status(404).json({
        message: 'Super admin was not found',
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
  }
};

// eslint-disable-next-line consistent-return
const updateAdminsById = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Id no valid',
      data: undefined,
      error: true,
    });
  }
  try {
    const findEmail = await SuperAdmin.findOne({ email });

    if (!findEmail) {
      const updateSuperAdmin = await SuperAdmin.findByIdAndUpdate(
        id,
        { email, password },
        { new: true },
      );

      if (updateSuperAdmin) {
        return res.status(201).json({
          message: 'Super admin update succesfully',
          data: updateSuperAdmin,
          error: false,
        });
      }
      return res.status(404).json({
        message: 'Super admin no found',
        data: undefined,
        error: true,
      });
    }
    return res.status(400).json({
      message: `Super admin with email ${email} already exist`,
      data: { email, password },
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

module.exports = {
  getAllSuperAdmins,
  getSuperAdminsById,
  createSuperAdmin,
  deleteAdminsById,
  updateAdminsById,
};
