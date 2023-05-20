const mongoose = require('mongoose');
const Member = require('../models/Member');

const getAllMembers = async (req, res) => {
  try {
    const response = await Member.find();
    if (!response) {
      return res.status(404).json({
        message: 'Members are empty',
        data: undefined,
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

const getMembersById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid id',
      data: undefined,
      error: true,
    });
  }
  try {
    const findMemberById = await Member.findById(id);
    if (!findMemberById) {
      return res.status(404).json({
        message: 'Id not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Member found',
      data: findMemberById,
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

const editMember = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid id',
      data: undefined,
      error: true,
    });
  }

  const {
    firstName, lastName, dni, phone, email, city, birthday, postalCode, isActive, membership,
  } = req.body;

  try {
    const actualMember = await Member.findById(id);

    if (!actualMember) {
      return res.status(404).json({
        message: `Member with ID: ${id} was not found`,
        data: undefined,
        error: true,
      });
    }

    const activityProperties = Object.keys(actualMember.toObject()).slice(1, -1);
    let changes = false;
    activityProperties.forEach((property) => {
      if (req.body[property]
    && req.body[property].toString() !== actualMember[property].toString()) {
        changes = true;
      }
    });

    if (!changes) {
      return res.status(200).json({
        message: 'There were no changes',
        data: actualMember,
        error: false,
      });
    }
    const response = await Member.findByIdAndUpdate(
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
    );

    return res.status(201).json({
      message: 'Member was edited succesfully!',
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
