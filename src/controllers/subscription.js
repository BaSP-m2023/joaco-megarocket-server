const mongoose = require('mongoose');
const Subscription = require('../models/Subscription');

const getSubscriptions = (req, res) => {
  Subscription.find()
    .then((subscriptions) => {
      return res.status(200).json({
        message: 'Subscriptions list',
        data: subscriptions,
        error: false,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: true,
        message: 'An error occurred',
        data: error,
      });
    })
};

const getSubscriptionsByID = (req, res) => {
  const { id } = req.params;
  Subscription.findById(id)
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
      error: true,
      message: 'An error occurred',
      data: undefined,
    }));
};

const createSubscription = (req, res) => {
  const { class, member, date } = req.body;
  Subscription.create({
    class,
    member,
    date,
  })
    .then((newSubscription) => res.status(201).json({
      error: false,
      message: 'Subscription created successfully',
      data: newSubscription,
    }))
    .catch((error) => res.status(500).json({
      error: true,
      message: 'An error ocurred',
      data: undefined,
    }))
};

const editSubscription = (req, res) => {
  const { id } = req.params;
  const { class, member, date } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: true,
      message: 'id is not valid',
    })
  }
  return Subscription.findByIdAndUpdate(
    id,
    {
      class,
      member,
      date,
    },
    { new: true },
  )
    .then((subscriptions) => {
      if (!subscriptions) {
        return res.status(404).json({
          error: true,
          message: `Subscription with id: ${id} not found`,
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
      error: true,
      message: 'An error occurred',
      data: undefined,
    }));
}

module.exports = {
  getSubscriptions,
  getSubscriptionsByID,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};