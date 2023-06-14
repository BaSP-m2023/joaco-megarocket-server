const mongoose = require('mongoose');
const Subscription = require('../models/Subscription');
const Class = require('../models/Class');
const Member = require('../models/Member');

const getSubscriptions = async (req, res) => {
  try {
    const response = await Subscription.find().populate({
      path: 'classes',
      select: 'activity hour slots',
      populate: {
        path: 'activity',
        select: 'name',
      },
    })
      .populate('member');

    return res.status(200).json({
      message: 'Subscriptions list',
      data: response,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
      data: undefined,
    });
  }
};

const getSubscriptionsByID = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: true,
      message: 'ID is not valid',
      data: id,
    });
  }

  try {
    const foundSubscriptionById = await Subscription.findById(id).populate('classes member');
    if (!foundSubscriptionById) {
      return res.status(404).json({
        error: true,
        message: 'Subscription not found',
        data: undefined,
      });
    }

    const { classes, member } = foundSubscriptionById;

    if (classes && !mongoose.isValidObjectId(classes)) {
      return res.status(400).json({
        error: true,
        message: 'Class ID is not valid',
        data: undefined,
      });
    }

    if (member && !mongoose.isValidObjectId(member)) {
      return res.status(400).json({
        error: true,
        message: 'member ID is not valid',
        data: undefined,
      });
    }

    return res.status(200).json({
      error: false,
      message: 'Subscription found',
      data: foundSubscriptionById,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
      data: undefined,
    });
  }
};

const createSubscription = async (req, res) => {
  const { classes, member, date } = req.body;

  if (!mongoose.isValidObjectId(classes) || !mongoose.isValidObjectId(member)) {
    return res.status(400).json({
      error: true,
      message: 'Class or member ID is not valid',
      data: undefined,
    });
  }

  try {
    const existingClass = await Class.findById(classes);
    const existingMember = await Member.findById(member);

    if (!existingClass || !existingMember) {
      return res.status(404).json({
        error: true,
        message: 'Class or member not found',
        data: undefined,
      });
    }

    const existingSubscription = await Subscription.findOne({ classes, member, date });

    if (existingSubscription) {
      return res.status(400).json({
        error: true,
        message: 'Subscription already exists',
        data: existingSubscription,
      });
    }

    const newSubscription = await Subscription.create({
      classes,
      member,
      date,
    });

    return res.status(201).json({
      error: false,
      message: 'Subscription was created successfully!',
      data: newSubscription,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
      data: undefined,
    });
  }
};

const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const { classes, member, date } = req.body;

  if (!mongoose.isValidObjectId(id)
  || (classes && !mongoose.isValidObjectId(classes))
  || (member && !mongoose.isValidObjectId(member))) {
    return res.status(400).json({
      error: true,
      message: 'ID, class or member is not valid',
    });
  }

  try {
    const existingClass = await Class.findById(classes);
    const existingMember = await Member.findById(member);

    if ((classes && !existingClass) || (member && !existingMember)) {
      return res.status(404).json({
        error: true,
        message: 'Class or member not found',
      });
    }

    const existingSubscription = await Subscription.findOne({ classes, member, date });

    if (existingSubscription && existingSubscription.id.toString() !== id) {
      return res.status(400).json({
        error: true,
        message: 'Subscription already exists',
        data: undefined,
      });
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      {
        classes,
        member,
        date,
      },
      { new: true },
    ).populate('classes member');

    if (!updatedSubscription) {
      return res.status(404).json({
        error: true,
        message: 'Subscription not found',
        data: undefined,
      });
    }

    return res.status(200).json({
      error: false,
      message: 'Subscription was updated successfully!',
      data: updatedSubscription,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
      data: undefined,
    });
  }
};

const deleteSubscription = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: true,
      message: 'ID is not valid!',
      data: id,
    });
  }

  try {
    const subscription = await Subscription.findByIdAndDelete(id);

    if (!subscription) {
      return res.status(404).json({
        error: true,
        message: 'Subscription not found!',
        data: undefined,
      });
    }

    return res.status(200).json({
      error: false,
      message: 'Subscription successfully deleted!',
      data: subscription,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
      data: undefined,
    });
  }
};

module.exports = {
  getSubscriptions,
  getSubscriptionsByID,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};
