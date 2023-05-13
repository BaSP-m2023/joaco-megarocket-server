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

  Admin.findById(id)
    .then((admin) => res.status(200).json({
      message: `Admin found: it was ${admin.firstName}`,
      data: admin,
      error: false,
    }))
    .catch((error) => res.json({
      message: 'An error ocurred',
      error,
    }));
};

module.exports = {
  getAllAdmins,
  getAdminById,
};
