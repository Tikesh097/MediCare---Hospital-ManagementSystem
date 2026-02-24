const mongoose = require('mongoose');

// Sub-schema for individual medicine entries
const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },       // e.g., "500mg"
  frequency: { type: String, required: true },    // e.g., "Twice a day"
  duration: { type: String, required: true },     // e.g., "7 days"
});

const prescriptionSchema = new mongoose.Schema(
  {
    // Each prescription is tied to a specific appointment
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
      unique: true,  // One prescription per appointment
    },
    medicines: {
      type: [medicineSchema],
      default: [],
    },
    diagnosis: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    followUpDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Prescription', prescriptionSchema);
