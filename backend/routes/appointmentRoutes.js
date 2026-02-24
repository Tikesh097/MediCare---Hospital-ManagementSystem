const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');

// All appointment routes require authentication
router.use(protect);

router.get('/', getAppointments);
router.post('/', authorize('patient'), createAppointment);
router.put('/:id', authorize('admin', 'doctor', 'patient'), updateAppointment);
router.delete('/:id', authorize('admin'), deleteAppointment);

module.exports = router;
