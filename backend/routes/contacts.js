const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Contact = require('../models/Contact');
const User = require('../models/User');

// @route   GET api/v1/contacts
// @desc    Get all user's contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   POST api/v1/contacts
// @desc    Add new contact
// @access  Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.status(201).json(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route   PUT api/v1/contacts/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure  user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.status(200).json(contact);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   DELETE api/v1/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure  user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: 'Contact deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
