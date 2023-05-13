const Member = require('../models/Member');

const createMember = (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, birthday, postalCode, isActive, membership,
  } = req.body;

  Member.create({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    birthday,
    postalCode,
    isActive,
    membership,
  })

    .then((result) => res.status(201).json(result))

    .catch((error) => res.status(400).json({
      message: 'Failed to create an Member',
      error,
    }));
};

module.exports = {
  createMember,
};
