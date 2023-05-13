const Member = require('../models/Member');

const getAllMembers = (req, res) => {
  Member.find()
    .then((members) => res.status(200).json({
      message: 'Complete list of members',
      data: members,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error has ocurred',
      data: error,
    }));
};

const getMembersById = (req, res) => {
  const { id } = req.params;

  Member.findById(id)
    .then((members) => res.status(200).json({
      message: `The member with the id ${id} is ${members.firstName}`,
      data: members,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error has ocurred',
      data: error,
    }));
};

module.exports = {
  getAllMembers,
  getMembersById,
};
