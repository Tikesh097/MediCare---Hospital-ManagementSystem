const express = require('express');
const router = express.Router();
const { getAnalytics, getAllUsers, deleteUser } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All admin routes are protected and admin-only
router.use(protect, authorize('admin'));

router.get('/analytics', getAnalytics);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;
