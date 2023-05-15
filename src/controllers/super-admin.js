const { default: mongoose } = require('mongoose');
const SuperAdmin = require('../models/Super-admin');

const getAllSuperAdmins = (req, res) => {
  SuperAdmin.find()
    .then((superAdmins) => {
      if (superAdmins.length > 0) {
        res.status(200).json({
          message: 'Successfully',
          data: superAdmins,
          error: false,
        });
      } else {
        res.status(400).json({
          message: 'There are no super admins yet',
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: 'An error occurred',
      error,
    }));
};

const getSuperAdminsById = (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({
      message: 'Id no valid',
      error: true,
    });
  } else {
    SuperAdmin.findById(id, 'email')
      .then((superAdmin) => {
        if (!superAdmin) {
          res.status(400).json({
            message: `This super admins with id: ${id} not exist`,
            error: true,
          });
        } else {
          res.status(200).json({
            message: 'Super admin found',
            data: superAdmin,
            error: false,
          });
        }
      })
      .catch((error) => res.status(400).json({
        message: 'An error ocurred',
        error,
      }));
  }
};

const createSuperAdmin = (req, res) => {
  const { email, password } = req.body;

  SuperAdmin.create({ email, password })
    .then((result) => res.status(201).json({
      message: 'Succesfully created',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred',
      error,
    }));
};

const deleteAdminsById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({
      message: 'Id not found',
      error: true,
    });
  } else {
    SuperAdmin.deleteOne({ _id: id })
      .then(() => res.status(200).json({
        message: `The super admins with id: ${id} was deleted`,
        error: false,
      }))
      .catch((error) => res.status(400).json({
        message: 'An error ocurred',
        error,
      }));
  }
};

const updateAdminsById = (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  if (id) {
    SuperAdmin.findByIdAndUpdate(id, { email, password }, { new: true })
      .then((superAdmins) => res.status(201).json({
        message: 'Super admin update succesfully',
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
  createSuperAdmin,
  deleteAdminsById,
  updateAdminsById,
};
