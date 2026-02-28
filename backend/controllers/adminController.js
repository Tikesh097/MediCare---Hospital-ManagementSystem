const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Contact = require('../models/Contact');

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = async (req, res, next) => {
  try {
    // Run all count queries in parallel for performance
    const [
      totalUsers,
      totalDoctors,
      totalPatients,
      totalAppointments,
      pendingAppointments,
      completedAppointments,
      unreadMessages,
    ] = await Promise.all([
      User.countDocuments(),
      Doctor.countDocuments(),
      Patient.countDocuments(),
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: 'pending' }),
      Appointment.countDocuments({ status: 'completed' }),
      Contact.countDocuments({ status: 'unread' }),   // NEW
    ]);

    res.json({
      success: true,
      analytics: {
        totalUsers,
        totalDoctors,
        totalPatients,
        totalAppointments,
        pendingAppointments,
        completedAppointments,
        unreadMessages,   // NEW - shows in admin dashboard
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a user and their profile
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove associated role profile
    if (user.role === 'doctor') {
      await Doctor.findOneAndDelete({ userId: user._id });
    } else if (user.role === 'patient') {
      await Patient.findOneAndDelete({ userId: user._id });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User and associated profile deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAnalytics, getAllUsers, deleteUser };
