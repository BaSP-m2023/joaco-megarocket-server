const mongoose = require('mongoose');
const Member = require('../models/Member');

const getAllMembers = (req, res) => {
  Member.find()
    .then((member) => {
      if (!member) {
        return res.status(404).json({
          message: 'Members are empty',
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

const createMember = async (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, birthday, postalCode, isActive, membership,
  } = req.body;

  try {
    const found = await Member.findOne({ dni });
    if (found) {
      throw Error('This member already exist');
    }
    const createdMember = await Member.create({
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      birthday,
      postalCode,
      isActive,
      membership,
    });
    return res.status(201).json({
      message: `Member ${createdMember.id} was created successfully!`,
      data: createdMember,
      error: false,
    });
  } catch (error) {
    if (error.message === 'This member already exist') {
      return res.status(400).json({
        message: 'Failed to create an Member, member already exist',
        data: undefined,
        error,
      });
    }
    return res.status(500).json({
      message: 'Error was ocurred',
      data: undefined,
      error,
    });
  }
};

const editMember = (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, birthday, postalCode, isActive, membership,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      message: `ID: ${id} format is not valid`,
    });
  }
  Member.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      birthday,
      postalCode,
      isActive,
      membership,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Member with ID: ${id} was not found`,
        });
      }
      return res.status(200).json({
        message: 'Member was edited succesfully!',
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'Error in the request',
      data: error,
      error,
    }));
};

const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw Error('Blank ID');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error('Invalid');
    }
    const memberDeleted = await Member.findByIdAndDelete(id);
    if (!memberDeleted) {
      throw Error('Member not found');
    }
    return res.status(200).json({
      message: 'Member was deleted succesfully!',
      data: memberDeleted,
      error: false,
    });
  } catch (error) {
    if (error.message === 'Blank ID') {
      return res.status(400).json({
        message: 'Please enter an ID',
        data: undefined,
        error,
      });
    }
    if (error.message === 'Invalid ID') {
      return res.status(400).json({
        message: `${id} is not a valid ID`,
        data: undefined,
        error,
      });
    }
    if (error.message === 'Member not found') {
      return res.status(400).json({
        message: 'Member not found',
        data: undefined,
        error,
      });
    }
    return res.status(500).json({
      message: 'Error was ocurred',
      data: undefined,
      error,
    });
  }
};

module.exports = {
  getAllMembers,
  getMembersById,
  createMember,
  editMember,
  deleteMember,
};
