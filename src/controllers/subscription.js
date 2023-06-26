import mongoose from 'mongoose';
import {
  isWithinInterval, addDays, getDay,
} from 'date-fns';
import Subscription from '../models/Subscription';
import Class from '../models/Class';
import Member from '../models/Member';

const getSubscriptions = async (req, res) => {
  try {
    const response = await Subscription.find().populate({
      path: 'classes',
      select: 'activity hour slots day',
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

const validateDate = (date, hour) => {
  const enteredDate = new Date(date);
  if (hour) {
    const [hours, minutes] = hour.split(':');

    enteredDate.setUTCHours(hours);
    enteredDate.setMinutes(minutes);
  } else {
    return ('error');
  }
  const currentDate = new Date();
  const maxAllowedDate = addDays(currentDate, 6);
  const currentHours = currentDate.getHours();

  currentDate.setUTCHours(currentHours);

  const dateRange = {
    start: currentDate,
    end: maxAllowedDate,
  };

  const isDateWithinRange = isWithinInterval(enteredDate, dateRange);

  return isDateWithinRange;
};

const validateDay = (classDay, enteredDate) => {
  if (enteredDate && classDay) {
    const date = new Date(enteredDate);
    date.getUTCDate('00');
    const dayNumber = getDay(date);
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weekDay = weekDays[dayNumber];

    return weekDay !== classDay;
  } return 'error';
};

const createSubscription = async (req, res) => {
  const { classes, member, date } = req.body;

  if (!mongoose.isValidObjectId(classes)) {
    return res.status(400).json({
      error: true,
      message: 'Class ID is not valid',
      data: undefined,
    });
  }

  if (!mongoose.isValidObjectId(member)) {
    return res.status(400).json({
      error: true,
      message: 'member ID is not valid',
      data: undefined,
    });
  }

  try {
    const existingClass = await Class.findById(classes);
    const existingMember = await Member.findById(member);
    const sameClassSubscription = await Subscription.find({ classes, date });

    if (existingClass && existingMember) {
      if (validateDay(existingClass?.day, date)) {
        return res.status(400).json({
          error: true,
          message: 'this class is not available this day',
          data: undefined,
        });
      }
    }

    if (sameClassSubscription.length >= existingClass?.slots) {
      return res.status(400).json({
        error: true,
        message: 'The slots are full',
        data: undefined,
      });
    }

    if (!validateDate(date, existingClass?.hour)) {
      return res.status(400).json({
        error: true,
        message: 'You cannot subscribe to a finished class',
        data: undefined,
      });
    }

    if (!existingClass) {
      return res.status(404).json({
        error: true,
        message: 'Class not found',
        data: undefined,
      });
    }

    if (!existingMember) {
      return res.status(404).json({
        error: true,
        message: 'Member not found',
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

const deleteOldSubscriptions = async (req, res) => {
  try {
    const currentDate = new Date();

    currentDate.setUTCHours('00');

    const oldSubscriptions = await Subscription.deleteMany({ date: { $lt: currentDate } });

    return res.status(200).json({
      error: false,
      message: 'Old subscriptions deleted successfully!',
      data: oldSubscriptions,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
      data: undefined,
    });
  }
};

const subscriptionController = {
  getSubscriptions,
  getSubscriptionsByID,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  deleteOldSubscriptions,
};

export default subscriptionController;
