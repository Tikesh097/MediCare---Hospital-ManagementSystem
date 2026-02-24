const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private/Patient
const createAppointment = async (req, res, next) => {
  try {
    const { doctorId, date, timeSlot, reason } = req.body;

    // Find patient profile using logged-in user's ID
    const patient = await Patient.findOne({ userId: req.user._id });
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }

    // Verify doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check for scheduling conflicts on the same day and time slot
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: new Date(date),
      timeSlot,
      status: { $nin: ['cancelled'] },
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }

    const appointment = await Appointment.create({
      patientId: patient._id,
      doctorId,
      date: new Date(date),
      timeSlot,
      reason,
    });

    // Populate related documents for full response
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate({ path: 'patientId', populate: { path: 'userId', select: 'name email' } })
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name email' } });

    res.status(201).json({ success: true, appointment: populatedAppointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Get appointments (filtered by role)
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res, next) => {
  try {
    let query = {};

    // Filter appointments based on the user's role
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ userId: req.user._id });
      if (!patient) return res.status(404).json({ message: 'Patient not found' });
      query.patientId = patient._id;
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
      query.doctorId = doctor._id;
    }
    // Admin sees all appointments (no filter applied)

    const appointments = await Appointment.find(query)
      .populate({ path: 'patientId', populate: { path: 'userId', select: 'name email' } })
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name email' }, select: 'specialization userId' })
      .sort({ date: -1 });

    res.json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment status or notes
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const { status, notes } = req.body;

    // Patients can only cancel their own appointments
    if (req.user.role === 'patient') {
      if (status && status !== 'cancelled') {
        return res.status(403).json({ message: 'Patients can only cancel appointments' });
      }
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    )
      .populate({ path: 'patientId', populate: { path: 'userId', select: 'name email' } })
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name email' } });

    res.json({ success: true, appointment: updatedAppointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete appointment (Admin only)
// @route   DELETE /api/appointments/:id
// @access  Private/Admin
const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAppointment, getAppointments, updateAppointment, deleteAppointment };
