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
  {
    _id: new mongoose.Types.ObjectId('74663d50bb2d87b9f6510623'),
    day: 'Monday',
    hour: '13:30',
    trainer: {
      _id: new mongoose.Types.ObjectId('74663d50bb2d87b9f6510627'),
      firstName: 'Ema',
      lastName: 'Siempreviva',
      dni: 1234576,
    },
    activity: {
      _id: new mongoose.Types.ObjectId('74663d50bb2d87b9f6510628'),
      name: 'voley',
      description: 'basic training that consists of throwing soft punches into the air wit hgrtfhgrehgtdfghdfgh dfghdfghdfgh dfgh dfgh dfgh',
    },
    slots: 7,
  },
];
