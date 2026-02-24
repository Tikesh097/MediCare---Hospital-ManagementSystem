const express = require('express');
const router = express.Router();
const {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');

// Public - list of doctors visible to all
router.get('/', getDoctors);
router.get('/:id', getDoctorById);

// Admin only - create and delete doctors
router.post('/', protect, authorize('admin'), createDoctor);
router.delete('/:id', protect, authorize('admin'), deleteDoctor);

// Admin or Doctor - update doctor profile
router.put('/:id', protect, authorize('admin', 'doctor'), updateDoctor);

module.exports = router;
