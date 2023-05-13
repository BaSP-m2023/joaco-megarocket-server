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

const updateActivity = () => {

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
