const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const getUserId = require("../functions/getUserIdFromReq");
const User = require("../models/User");
const Contact = require("../models/Contact");
const { findOne } = require("../models/User");

// @route   GET /api/contacts
// @desc    Get all contacts from a user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  "/",
  [auth, [check("name", "Please enter a name").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    // if there are errors
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
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT /api/contacts/:id
// @desc    Replace contact
// @access  Private
router.put("/:id", auth, async (req, res) => {
  //  what if some random user gets access to the contact id?
  //  I cant just trust the call with the id alone,
  //  I need to check the user id as well, to see if it belongs to the contact
  let userId = getUserId(req);
  try {
    let contact = await Contact.findOne({ _id: req.params.id });
    if (contact && contact.user.equals(userId)) {
      await contact.updateOne(req.body);
      contact = await Contact.findById(req.params.id);
      res.jsonp(contact);
    } else {
      res.status(403).send("Method denied");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  //  what if some random user gets access to the contact id?
  //  I cant just trust the call with the id alone,
  //  I need to check the user id as well, to see if it belongs to the contact
  let userId = getUserId(req);
  try {
    let contact = await Contact.findOne({ _id: req.params.id });
    if (contact && contact.user.equals(userId)) {
      contact.remove();
      res.jsonp({ msg: `Contact deleted, id: ${req.params.id}` });
    } else {
      res.status(403).send("Method denied");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
