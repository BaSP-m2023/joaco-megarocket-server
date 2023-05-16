const { default: mongoose } = require('mongoose');
const Activity = require('../models/Activity');

const getAllActivities = (req, res) => {
  Activity.find()
    .then((activities) => {
      if (activities.length === 0) {
        return res.status(404).json({
          message: 'There are no activities',
          data: activities,
          error: false,
        });
      }
      return res.status(200).json({
        message: 'Activities List',
        data: activities,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    }));
};

const getActivityByID = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: id,
      error: true,
    });
  }

  return Activity.findById(id)
    .then((activity) => {
      if (!activity) {
        return res.status(404).json({
          message: 'Activity not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Activity found!',
        data: activity,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    }));
};

const createActivity = async (req, res) => {
  const { name, description, isActive } = req.body;

  const activityExists = await Activity.findOne({ name });
  if (activityExists) {
    return res.status(400).json({
      message: `${name} activity already exists`,
      data: undefined,
      error: true,
    });
  }

  return Activity.create({
    name,
    description,
    isActive,
  })
    .then((newActivity) => res.status(201).json({
      message: 'Activity created successfuly',
      data: newActivity,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    }));
};

const updateActivity = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: id,
      error: true,
    });
  }

  const { name, description, isActive } = req.body;

  const actualActivity = await Activity.findById(id);
  const activityProperties = Object.keys(actualActivity.toObject()).slice(1, -1);
  let changes = false;
  activityProperties.forEach((property) => {
    if (req.body[property]
    && req.body[property].toString() !== actualActivity[property].toString()) {
      changes = true;
    }
  });

  if (!changes) {
    return res.status(200).json({
      message: 'There were no changes',
      data: actualActivity,
      error: false,
    });
  }

  return Activity.findByIdAndUpdate(
    id,
    {
      name,
      description,
      isActive,
    },
    { new: true },
  )
    .then((activity) => {
      if (!activity) {
        return res.status(404).json({
          message: `The activity with the ID: ${activity.id} doesn't exists`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Activity updated successfuly!',
        data: activity,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    }));
};

const deleteActivity = (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      data: id,
      error: true,
    });
  }

  return Activity.findByIdAndDelete(id)
    .then((activity) => {
      if (!activity) {
        return res.status(404).json({
          message: 'Activity not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(204).json({});
    })
    .catch((error) => res.status(500).json({
      message: `An error ocurred: ${error}`,
      data: undefined,
      error: true,
    }));
};

module.exports = {
  getAllActivities,
  getActivityByID,
  createActivity,
  updateActivity,
  deleteActivity,
};
