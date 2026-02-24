const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    // Reference to User model for authentication
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      trim: true,
    },
    experience: {
      type: Number,
      required: [true, 'Experience is required'],
      min: 0,
    },
    // Availability as array of days e.g. ["Monday", "Wednesday"]
    availability: {
      type: [String],
      default: [],
    },
    qualifications: {
      type: String,
      trim: true,
    },
    consultationFee: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);
