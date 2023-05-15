const mongoose = require('mongoose');
const Member = require('../models/Member');

const getAllMembers = (req, res) => {
  Member.find()
    .then((member) => {
      if (!member) {
        return res.status(404).json({
          message: 'Member not found',
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Complete list of members',
        data: member,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error has ocurred',
      data: error,
    }));
};

const getMembersById = (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: 'Invalid id',
      data: id,
      error: true,
    });
  } else {
    Member.findById(id)
      .then((member) => {
        if (!member) {
          return res.status(404).json({
            message: 'Member not found',
            error: true,
          });
        }
        return res.status(200).json({
          message: 'Member found',
          data: member,
          error: false,
        });
      })
      .catch((error) => res.status(400).json({
        message: `An error occurred with the ID: ${id}`,
        data: error,
      }));
  }
};

module.exports = {
  getAllMembers,
  getMembersById,
};
