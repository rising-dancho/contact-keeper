const express = require('express');
const router = express.Router();

// @route   GET api/v1/contacts
// @desc    Get all user contacts
// @access  Private
router.get('/', (req, res) => res.send('Get all contacts'));

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
