import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('6462261d7ead90b46b7471cc'),
    name: 'box',
    description: 'basic training that consists of throwing soft punches into the air wit',
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('6466b3e7a21fd4069bcaf7c0'),
    name: 'yoga',
    description: 'helps improving your body and mental health',
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('6467cd965eada13a19071ab9'),
    name: 'functional',
    description: 'this activity involves movements that enable greater overall body functioning and improve performance through better coordination and muscle stimulation',
    isActive: false,
  },
  {
    _id: new mongoose.Types.ObjectId('74663d50bb2d87b9f6510626'),
    name: 'functio',
    description: 'this activity involves movements that enable greater overall body functioning and improve performance through better coordination and muscle stimulation',
    isActive: false,
  },
];
