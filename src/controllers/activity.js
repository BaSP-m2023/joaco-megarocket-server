import mongoose from 'mongoose';
import Activity from '../models/Activity';

const getAllActivities = async (req, res) => {
  try {
    const activitiesFound = await Activity.find();

    return res.status(200).json({
      message: 'Activities List',
      data: activitiesFound,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getActivityByID = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: undefined,
      error: true,
    });
  }

  try {
    const activityFound = await Activity.findById(id);

    if (!activityFound) {
      return res.status(404).json({
        message: 'Activity not found',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Activity found!',
      data: activityFound,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const createActivity = async (req, res) => {
  const { name, description, isActive } = req.body;

  try {
    const activityExists = await Activity.findOne({ name });

    if (activityExists) {
      return res.status(400).json({
        message: `${name} activity already exists`,
        data: req.body,
        error: true,
      });
    }

    const newActivity = await Activity.create({
      name,
      description,
      isActive,
    });

    return res.status(201).json({
      message: 'Activity was created successfully!',
      data: newActivity,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateActivity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: undefined,
      error: true,
    });
  }

  const { name, description, isActive } = req.body;

  try {
    const actualActivity = await Activity.findById(id);

    if (!actualActivity) {
      return res.status(404).json({
        message: `The activity with the ID: ${id} doesn't exists`,
        data: undefined,
        error: true,
      });
    }

    const activityProperties = Object.keys(actualActivity.toObject()).slice(1, -1);
    let changes = false;
    activityProperties.forEach((property) => {
      if (req.body[property]
      && req.body[property].toString().toLowerCase() !== actualActivity[property].toString()) {
        changes = true;
      }
    });
    const activityExists = await Activity.findOne({
      $and: [
        {
          $and: [{ name }],
        },
        {
          _id: { $ne: id },
        },
      ],
    });
    if (activityExists) {
      return res.status(400).json({
        message: `${name} activity already exists`,
        data: req.body,
        error: true,
      });
    }
    if (!changes) {
      return res.status(400).json({
        message: 'There were no changes',
        data: actualActivity,
        error: true,
      });
    }

    const activityUpdated = await Activity.findByIdAndUpdate(
      id,
      {
        name,
        description,
        isActive,
      },
      { new: true },
    );

    return res.status(200).json({
      message: 'Activity was updated successfully!',
      data: activityUpdated,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteActivity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: id,
      error: true,
    });
  }

  try {
    const activityDeleted = await Activity.findByIdAndDelete(id);

    if (!activityDeleted) {
      return res.status(404).json({
        message: 'Activity not found',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Activity successfully deleted!',
      data: activityDeleted,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const activitiesController = {
  getAllActivities,
  getActivityByID,
  createActivity,
  updateActivity,
  deleteActivity,
};

export default activitiesController;
