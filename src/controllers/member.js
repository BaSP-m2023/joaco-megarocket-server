const mongoose = require('mongoose');
const Member = require('../models/Member');

const getAllMembers = async (req, res) => {
  try {
    const response = await Member.find();

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
      message: 'Member was created successfully!',
      data: createdMember,
      error: false,
    });
  } catch (error) {
    if (error.message === 'This member already exist') {
      return res.status(400).json({
        message: 'This Member already exist',
        data: undefined,
        error: true,
      });
    }
    return res.status(500).json({
      message: 'Error was ocurred',
      data: undefined,
      error: true,
    });
  }
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

    const memberProperties = Object.keys(actualMember.toObject()).slice(1, -1);
    let changes = false;
    memberProperties.forEach((property) => {
      if (req.body[property]
    && req.body[property].toString() !== actualMember[property].toString()) {
        changes = true;
      }
    });

    const aMemberAlreadyHasDni = await Member.findOne({
      $and: [
        {
          $or: [{ dni }],
        },
        {
          _id: { $ne: id },
        },
      ],
    });
    if (aMemberAlreadyHasDni) {
      return res.status(400).json({
        message: 'There is another member with that dni.',
        data: req.body,
        error: true,
      });
    }

    const aMemberAlreadyHasEmail = await Member.findOne({
      $and: [
        {
          $or: [{ email }],
        },
        {
          _id: { $ne: id },
        },
      ],
    });
    if (aMemberAlreadyHasEmail) {
      return res.status(400).json({
        message: 'There is another member with that email.',
        data: req.body,
        error: true,
      });
    }

    if (!changes) {
      return res.status(400).json({
        message: 'There were no changes',
        data: actualMember,
        error: true,
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

    return res.status(200).json({
      message: 'Member was updated successfully!',
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

const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid id',
        data: undefined,
        error: true,
      });
    }
    const memberDeleted = await Member.findByIdAndDelete(id);
    if (!memberDeleted) {
      throw Error('Member not found');
    }
    return res.status(200).json({
      message: 'Member successfully deleted!',
      data: memberDeleted,
      error: false,
    });
  } catch (error) {
    if (error.message === 'Blank ID') {
      return res.status(400).json({
        message: 'Please enter an ID',
        data: undefined,
        error: true,
      });
    }
    if (error.message === 'Invalid ID') {
      return res.status(400).json({
        message: `${id} is not a valid ID`,
        data: undefined,
        error: true,
      });
    }
    if (error.message === 'Member not found') {
      return res.status(404).json({
        message: 'Member not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(500).json({
      message: 'Error was ocurred',
      data: undefined,
      error: true,
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
