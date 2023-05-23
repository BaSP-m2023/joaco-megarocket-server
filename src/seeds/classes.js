// test comment
import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('74663d50bb2d87b9f6510621'),
    day: 'Sunday',
    hour: '20:00',
    trainer: new mongoose.Types.ObjectId('74663d50bb2d87b9f6510622'),
    activity: new mongoose.Types.ObjectId('74663d50bb2d87b9f6510623'),
    slots: 8,
  },
  {
    _id: new mongoose.Types.ObjectId('74663d50bb2d87b9f6510624'),
    day: 'Thursday',
    hour: '17:00',
    trainer: new mongoose.Types.ObjectId('74663d50bb2d87b9f6510625'),
    activity: new mongoose.Types.ObjectId('74663d50bb2d87b9f6510626'),
    slots: 6,
  },
];
