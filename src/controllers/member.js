const mongoose = require('mongoose');
const Member = require('../models/Member');

const getAllMembers = async (req, res) => {
  try {
    const response = await Member.find();
    if (!response) {
      return res.status(404).json({
        message: 'Members are empty',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Complete list of members',
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

const createMember = (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, birthday, postalCode, isActive, membership,
  } = req.body;

  Member.create({
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
  })

    .then((result) => res.status(201).json({
      message: `Member ${result.id} was created successfully!`,
      data: result,
      error: false,
    }))

    .catch((error) => res.status(400).json({
      message: 'Failed to create an Member',
      error,
    }));
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

const deleteMember = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      message: `ID: ${id} is not valid`,
    });
  }
  Member.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Member with ID: ${id} was not found`,
        });
      }
      return res.status(200).json({
        message: 'Member was deleted succesfully!',
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'Request error',
      data: error,
      error,
    }));
};

module.exports = {
  getAllMembers,
  getMembersById,
  createMember,
  editMember,
  deleteMember,
};
