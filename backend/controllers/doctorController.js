const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Get all doctors with user info populated
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'name email');
    res.json({ success: true, count: doctors.length, doctors });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({ success: true, doctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new doctor (Admin only)
// @route   POST /api/doctors
// @access  Private/Admin
const createDoctor = async (req, res, next) => {
  try {
    const { name, email, password, specialization, experience, availability, qualifications, consultationFee, bio } = req.body;

    // Create user account first with doctor role
    const user = await User.create({ name, email, password, role: 'doctor' });

    // Create doctor profile linked to the user
    const doctor = await Doctor.create({
      userId: user._id,
      specialization,
      experience,
      availability: availability || [],
      qualifications,
      consultationFee: consultationFee || 0,
      bio,
    });

    // Populate user info in response
    const populatedDoctor = await Doctor.findById(doctor._id).populate('userId', 'name email');

    res.status(201).json({ success: true, doctor: populatedDoctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/:id
// @access  Private/Admin or Doctor (own profile)
const updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Only admin or the doctor themselves can update
    if (req.user.role !== 'admin' && doctor.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this doctor' });
    }

    const { specialization, experience, availability, qualifications, consultationFee, bio } = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { specialization, experience, availability, qualifications, consultationFee, bio },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    res.json({ success: true, doctor: updatedDoctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete doctor and associated user account
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Delete the associated user account as well
    await User.findByIdAndDelete(doctor.userId);
    await Doctor.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Doctor deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor };
