const express = require('express');
const router = express.Router();
const {
  createPrescription,
  getPrescriptionByAppointment,
  getMyPrescriptions,
  updatePrescription,
} = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

// Patient views all their prescriptions
router.get('/my', authorize('patient'), getMyPrescriptions);

// Doctor creates and updates prescriptions
router.post('/', authorize('doctor'), createPrescription);
router.put('/:id', authorize('doctor'), updatePrescription);

// Get prescription by appointment ID
router.get('/:appointmentId', getPrescriptionByAppointment);

module.exports = router;
