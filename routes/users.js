const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const Users = require("../models/Users");
//@route POST api/users
//@desc  Register a user
//@access  Public
router.post(
  "/",
  [
    check("firstname", "First Name is required").not().isEmpty(),
    check("lastname", "Last Name is required").not().isEmpty(),
    check("email", "Please include a valide email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("passed");
  }
);

module.exports = router;
