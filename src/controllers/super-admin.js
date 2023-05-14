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

const createSuperAdmin = (req, res) => {
  const { email, password } = req.body;

  SuperAdmin.create({ email, password })
    .then((result) => res.status(201).json(result))
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
