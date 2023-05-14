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
      message: 'An error has occurred while processing your request.',
      data: error,
    });
  })
}

const getSubscriptionsByID = (req, res) => {
  const { id } = req.params;
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
      error: true,
      message: 'An error occurred',
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