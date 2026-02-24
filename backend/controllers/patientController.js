const Patient = require('../models/Patient');
const User = require('../models/User');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private/Admin or Doctor
const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find().populate('userId', 'name email');
    res.json({ success: true, count: patients.length, patients });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single patient by patient profile ID
// @route   GET /api/patients/:id
// @access  Private
const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('userId', 'name email');

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Patients can only view their own profile; admin and doctors can view any
    if (
      req.user.role === 'patient' &&
      patient.userId._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to view this profile' });
    }

    res.json({ success: true, patient });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient profile of currently logged-in patient
// @route   GET /api/patients/me
// @access  Private/Patient
const getMyProfile = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ userId: req.user._id }).populate('userId', 'name email');
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    res.json({ success: true, patient });
  } catch (error) {
    next(error);
  }
};

// @desc    Update patient profile
// @route   PUT /api/patients/:id
// @access  Private/Patient (own profile) or Admin
const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Ensure patients can only update their own profile
    if (
      req.user.role === 'patient' &&
      patient.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    const { age, gender, phone, address, bloodGroup, medicalHistory, allergies } = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { age, gender, phone, address, bloodGroup, medicalHistory, allergies },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    res.json({ success: true, patient: updatedPatient });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPatients, getPatientById, getMyProfile, updatePatient };
