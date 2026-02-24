const express = require('express');
const router = express.Router();
const { getPatients, getPatientById, getMyProfile, updatePatient } = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/auth');

// All patient routes require authentication
router.use(protect);

// Patient can access their own profile
router.get('/me', authorize('patient'), getMyProfile);

// Admin and Doctor can see all patients
router.get('/', authorize('admin', 'doctor'), getPatients);
router.get('/:id', getPatientById);
router.put('/:id', authorize('admin', 'patient'), updatePatient);

module.exports = router;
