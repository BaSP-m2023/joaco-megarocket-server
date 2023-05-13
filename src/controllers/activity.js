const Activity = require('../models/Activity');

const getAllActivities = (req, res) => {
  Activity.find()
    .then((activities) => {
      if (activities.length === 0) {
        return res.status(404).json({
          message: 'There are no activities',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Activities List',
        data: activities,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      data: undefined,
      error,
    }));
};

const getActivityByID = (req, res) => {
  const { id } = req.params;
  Activity.findById(id)
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
      message: 'An error ocurred',
      data: undefined,
      error,
    }));
};

const createActivity = (req, res) => {
  const { name, description, isActive } = req.body;

  Activity.create({
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
      message: 'An error ocurred',
      data: undefined,
      error,
    }));
};

const updateActivity = (req, res) => {
  const { id } = req.params;
  const { name, description, isActive } = req.body;

  Activity.findByIdAndUpdate(
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
      if (!activity.isModified()) {
        return res.status(200).json({
          message: 'There were no changes',
          data: activity,
          error: false,
        });
      }
      return res.status(200).json({
        message: 'Activity updated successfuly!',
        data: activity,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      data: undefined,
      error,
    }));
};

const deleteActivity = (req, res) => {
  const { id } = req.params;
  Activity.findByIdAndDelete(id)
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
      message: 'An error ocurred',
      data: undefined,
      error,
    }));
};

module.exports = {
  getAllActivities,
  getActivityByID,
  createActivity,
  updateActivity,
  deleteActivity,
};
