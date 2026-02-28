const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

// Public - anyone can submit a contact form
router.post('/', submitContact);

// Admin only - manage contact messages
router.get('/', protect, authorize('admin'), getContacts);
router.put('/:id', protect, authorize('admin'), updateContactStatus);
router.delete('/:id', protect, authorize('admin'), deleteContact);

module.exports = router;
