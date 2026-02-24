const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// @desc    Create a prescription for an appointment
// @route   POST /api/prescriptions
// @access  Private/Doctor
const createPrescription = async (req, res, next) => {
  try {
    const { appointmentId, medicines, diagnosis, notes, followUpDate } = req.body;

    // Verify the appointment exists
    const appointment = await Appointment.findById(appointmentId).populate('doctorId');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Verify the doctor is assigned to this appointment
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor || appointment.doctorId._id.toString() !== doctor._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to prescribe for this appointment' });
    }

    // Check if prescription already exists for this appointment
    const existingPrescription = await Prescription.findOne({ appointmentId });
    if (existingPrescription) {
      return res.status(400).json({ message: 'Prescription already exists for this appointment' });
    }

    const prescription = await Prescription.create({
      appointmentId,
      medicines,
      diagnosis,
      notes,
      followUpDate,
    });

    // Mark appointment as completed when prescription is added
    await Appointment.findByIdAndUpdate(appointmentId, { status: 'completed' });

    res.status(201).json({ success: true, prescription });
  } catch (error) {
    next(error);
  }
};

// @desc    Get prescription for a specific appointment
// @route   GET /api/prescriptions/:appointmentId
// @access  Private
const getPrescriptionByAppointment = async (req, res, next) => {
  try {
    const prescription = await Prescription.findOne({
      appointmentId: req.params.appointmentId,
    }).populate({
      path: 'appointmentId',
      populate: [
        { path: 'patientId', populate: { path: 'userId', select: 'name email' } },
        { path: 'doctorId', populate: { path: 'userId', select: 'name email' } },
      ],
    });

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    res.json({ success: true, prescription });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all prescriptions for the logged-in patient
// @route   GET /api/prescriptions/my
// @access  Private/Patient
const getMyPrescriptions = async (req, res, next) => {
  try {
    const Patient = require('../models/Patient');
    const patient = await Patient.findOne({ userId: req.user._id });

    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }

    // Find all completed appointments for this patient
    const appointments = await Appointment.find({
      patientId: patient._id,
      status: 'completed',
    });

    const appointmentIds = appointments.map((a) => a._id);

    // Fetch prescriptions for those appointments
    const prescriptions = await Prescription.find({
      appointmentId: { $in: appointmentIds },
    }).populate({
      path: 'appointmentId',
      populate: { path: 'doctorId', populate: { path: 'userId', select: 'name' } },
    });

    res.json({ success: true, count: prescriptions.length, prescriptions });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a prescription
// @route   PUT /api/prescriptions/:id
// @access  Private/Doctor
const updatePrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    res.json({ success: true, prescription });
  } catch (error) {
    next(error);
  }
};

module.exports = { createPrescription, getPrescriptionByAppointment, getMyPrescriptions, updatePrescription };
