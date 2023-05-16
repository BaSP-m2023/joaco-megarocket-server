const mongoose = require('mongoose');
const Subscription = require('../models/Subscription');

const getSubscriptions = (req, res) => {
  Subscription.find()
    .then((subscriptions) => res.status(200).json({
      message: 'Subscriptions list',
      data: subscriptions,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      error,
      message: 'An error occurred',
      data: error,
    }));
};

const getSubscriptionsByID = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: true,
      message: 'ID is not valid',
      data: id,
    });
  }
  return Subscription.findById(id)
    .then((subscription) => {
      if (!subscription) {
        return res.status(404).json({
          error: true,
          message: 'Subscription not found',
          data: undefined,
        });
      }
      return res.status(200).json({
        error: false,
        message: 'Subscription found',
        data: subscription,
      });
    })
    .catch((error) => res.status(500).json({
      error,
      message: 'An error occurred',
      data: undefined,
    }));
};

const createSubscription = (req, res) => {
  const { classes, member, date } = req.body;
  Subscription.create({
    classes,
    member,
    date,
  })
    .then((newSubscription) => res.status(201).json({
      error: false,
      message: 'Subscription created successfully',
      data: newSubscription,
    }))
    .catch((error) => res.status(500).json({
      error,
      message: 'An error ocurred',
      data: undefined,
    }));
};

const updateSubscription = (req, res) => {
  const { id } = req.params;
  const { classes, member, date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: true,
      message: 'ID is not valid',
    });
  }
  return Subscription.findByIdAndUpdate(
    id,
    {
      classes,
      member,
      date,
    },
    { new: true },
  )
    .then((subscriptions) => {
      if (!subscriptions) {
        return res.status(404).json({
          error: true,
          message: 'Subscription not found',
          data: undefined,
        });
      }
      return res.status(200).json({
        error: false,
        message: 'Subscription updated successfully',
        data: subscriptions,
      });
    })
    .catch((error) => res.status(500).json({
      error,
      message: 'An error occurred',
      data: undefined,
    }));
};

const deleteSubscription = (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: true,
      message: 'ID is not valid',
      data: id,
    });
  }
  return Subscription.findByIdAndDelete(id)
    .then((subscription) => {
      if (!subscription) {
        return res.status(404).json({
          error: true,
          message: 'Subscription not found',
          data: undefined,
        });
      }
      return res.status(200).json({
        message: 'Subscription deleted successfully',
      });
    })
    .catch((error) => res.status(500).json({
      error,
      message: 'An error ocurred',
      data: undefined,
    }));
};

module.exports = {
  getSubscriptions,
  getSubscriptionsByID,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};
