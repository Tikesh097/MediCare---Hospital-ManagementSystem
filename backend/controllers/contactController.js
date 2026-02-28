const Contact = require('../models/Contact');

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = await Contact.create({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you soon!',
      contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, contacts });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark contact message as read (Admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateContactStatus = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status || 'read' },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ success: true, contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a contact message (Admin only)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ success: true, message: 'Contact message deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContact, getContacts, updateContactStatus, deleteContact };
