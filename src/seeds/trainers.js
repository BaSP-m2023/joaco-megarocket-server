import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('6462a2ee2aac39ef714f13d5'),
    firstName: 'Delfi',
    lastName: 'jiji',
    dni: 43576575,
    phone: 3416534443,
    email: 'delfi@gmail.com',
    city: 'Rosario',
    password: 'Holis123aa',
    salary: 50000,
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('646642acfac4c6a035b35000'),
    firstName: 'Gino',
    lastName: 'juju',
    dni: 1234567,
    phone: 1234567891,
    email: 'gino@gmail.com',
    city: 'Rosario',
    password: 'Abcdefg123',
    salary: 60000,
    isActive: false,
  },
];
