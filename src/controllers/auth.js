import SuperAdmin from '../models/Super-admin';
import Member from '../models/Member';
import Admin from '../models/Admin';
import Trainer from '../models/Trainer';

const getAuth = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findOne({ firebaseUid: req.params.firebaseUid });
    if (superAdmin) {
      return res.status(201).json({
        message: 'super admin found',
        data: superAdmin,
        error: false,
      });
    }

    const member = await Member.findOne({ firebaseUid: req.params.firebaseUid });
    if (member) {
      return res.status(201).json({
        message: 'Member found',
        data: member,
        error: false,
      });
    }

    const admin = await Admin.findOne({ firebaseUid: req.params.firebaseUid });
    if (admin) {
      return res.status(201).json({
        message: 'Admin found',
        data: admin,
        error: false,
      });
    }

    const trainer = await Trainer.findOne({ firebaseUid: req.params.firebaseUid });
    if (trainer) {
      return res.status(201).json({
        message: 'Trainer found',
        data: trainer,
        error: false,
      });
    }

    return res.status(404).json({
      message: 'User not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error: true,
    });
  }
};

export default getAuth;
