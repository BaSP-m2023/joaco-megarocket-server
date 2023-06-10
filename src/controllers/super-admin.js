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
          message: 'SuperAdmin was created successfully!',
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
const deleteSuperAdminsById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: 'Id not valid',
      data: undefined,
      error: true,
    });
  } else {
    try {
      const superAdminDeleted = await SuperAdmin.findByIdAndDelete(id);

      if (superAdminDeleted) {
        return res.status(200).json({
          message: 'SuperAdmin deleted successfully',
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
const updateSuperAdmin = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  if (id.length !== 24) {
    return res.status(400).json({
      message: 'Invalid id, try again',
      data: undefined,
      error: true,
    });
  }

  try {
    const actualSuperAdmin = await SuperAdmin.findById(id);

    if (!actualSuperAdmin) {
      return res.status(404).json({
        message: `SuperAdmin with ID: ${id} was not found`,
        data: undefined,
        error: true,
      });
    }

    const actualSuperAdminProperties = Object.keys(actualSuperAdmin.toObject()).slice(1, -1);
    let changes = false;
    actualSuperAdminProperties.forEach((property) => {
      if (req.body[property]
    && req.body[property].toString() !== actualSuperAdmin[property].toString()) {
        changes = true;
      }
    });

    const aSuperAdminAlreadyHasEmail = await SuperAdmin.findOne({
      $and: [
        {
          $or: [{ email }],
        },
        {
          _id: { $ne: id },
        },
      ],
    });
    if (aSuperAdminAlreadyHasEmail) {
      return res.status(400).json({
        message: 'There is another SuperAdmin with that email.',
        data: req.body,
        error: true,
      });
    }

    if (!changes) {
      return res.status(400).json({
        message: 'There were no changes',
        data: actualSuperAdmin,
        error: true,
      });
    }
    const response = await SuperAdmin.findByIdAndUpdate(
      id,
      {
        email,
        password,
      },
      { new: true },
    );

    return res.status(200).json({
      message: 'SuperAdmin edited successfully!',
      data: response,
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

module.exports = {
  getAllSuperAdmins,
  getSuperAdminsById,
  createSuperAdmin,
  deleteSuperAdminsById,
  updateSuperAdmin,
};
