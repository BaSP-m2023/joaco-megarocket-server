import mongoose from 'mongoose';
import Trainer from '../models/Trainer';
import firebaseApp from '../helper/firebase';

// eslint-disable-next-line consistent-return
const createTrainer = async (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password, salary, isActive,
  } = req.body;

  try {
    const dniExists = await Trainer.findOne({ dni });
    const emailExists = await Trainer.findOne({ email });
    if (dniExists) {
      return res.status(400).json({
        message: 'A Trainer with that DNI already exists!',
        data: undefined,
        error: true,
      });
    }
    if (emailExists) {
      return res.status(400).json({
        message: 'A Trainer with that Email already exists!',
        data: undefined,
        error: true,
      });
    }
    if (!emailExists && !dniExists) {
      const newFirebaseUser = await firebaseApp.auth().createUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dni: req.body.dni,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        salary: req.body.salary,
        isActive: req.body.isActive,
      });
      const firebaseUid = newFirebaseUser.uid;

      await firebaseApp.auth().setCustomUserClaims(firebaseUid, { role: 'TRAINER' });
      const newTrainer = await Trainer.create({
        firebaseUid,
        firstName,
        lastName,
        dni,
        phone,
        email,
        city,
        password,
        salary,
        isActive,
      });

      return res.status(201).json({
        message: 'Trainer was created successfully!',
        data: newTrainer,
        error: false,
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

const updateTrainer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: undefined,
      error: true,
    });
  }

  const {
    firstName, lastName, dni, phone, email, city, password, salary, isActive,
  } = req.body;

  try {
    const actualTrainer = await Trainer.findById(id);

    if (!actualTrainer) {
      return res.status(404).json({
        message: `The trainer with the ID: ${id} doesn't exists`,
        data: undefined,
        error: true,
      });
    }

    const trainerProperties = Object.keys(actualTrainer.toObject()).slice(1, -1);
    let changes = false;
    trainerProperties.forEach((property) => {
      if (req.body[property]
      && req.body[property].toString() !== actualTrainer[property].toString()) {
        changes = true;
      }
    });
    if (!changes) {
      return res.status(400).json({
        message: 'There were no changes',
        data: actualTrainer,
        error: true,
      });
    }

    const aTrainerAlreadyHasDni = await Trainer.findOne({
      $and: [
        {
          $or: [{ dni }],
        },
        {
          _id: { $ne: id },
        },
      ],
    });
    if (aTrainerAlreadyHasDni) {
      return res.status(400).json({
        message: 'There is another trainer with that dni.',
        data: req.body,
        error: true,
      });
    }

    const aTrainerAlreadyHasEmail = await Trainer.findOne({
      $and: [
        {
          $or: [{ email }],
        },
        {
          _id: { $ne: id },
        },
      ],
    });
    if (aTrainerAlreadyHasEmail) {
      return res.status(400).json({
        message: 'There is another trainer with that email.',
        data: req.body,
        error: true,
      });
    }
    const trainerUpdate = await Trainer.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        dni,
        phone,
        email,
        city,
        password,
        salary,
        isActive,
      },
      { new: true },
    );
    return res.status(200).json({
      message: 'Trainer was updated succesfully!',
      data: trainerUpdate,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred: ${error}!`,
      data: undefined,
      error: true,
    });
  }
};

const deleteTrainer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: id,
      error: true,
    });
  }

  try {
    const trainerDelete = await Trainer.findByIdAndDelete(id);

    if (!trainerDelete) {
      return res.status(404).json({
        message: `Trainer with ID: ${id} was not found`,
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Trainer successfully deleted!',
      data: trainerDelete,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred!',
      data: undefined,
      error: true,
    });
  }
};

const getAllTrainer = async (req, res) => {
  try {
    const trainers = await Trainer.find();

    if (!trainers) {
      return res.status(404).json({
        message: 'Trainers not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainers list',
      data: trainers,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred to find the trainers',
      data: undefined,
      error: true,
    });
  }
};

const getTrainerById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid id',
      data: undefined,
      error: true,
    });
  }
  try {
    const trainer = await Trainer.findById(id, 'firstName lastName email');
    if (!trainer) {
      return res.status(404).json({
        message: `Trainer ID ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Trainer found ${trainer.firstName} ${trainer.lastName}`,
      data: trainer,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error occurred to find the trainer with ID ${id}`,
      data: undefined,
      error: true,
    });
  }
};

const trainerController = {
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getAllTrainer,
  getTrainerById,
};

export default trainerController;
