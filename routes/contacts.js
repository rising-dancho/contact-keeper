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
    res.send(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/v1/contacts
// @desc    Add new contact
// @access  Private
router.post('/', (req, res) => res.send('Add contact'));

// @route   POST api/v1/contacts/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', (req, res) => res.send('Update contact'));

// @route   POST api/v1/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', (req, res) => res.send('Delete contact'));

module.exports = router;
