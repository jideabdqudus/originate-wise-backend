const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Plan = require("../models/Plans");
const User = require("../models/User");

//@route GET api/plans
//@desc  Get user plans
//@access  Private
router.get("/", auth, async (req, res) => {
  try {
    const plans = await Plan.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(plans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/plans
//@desc  Add new plan
//@access  Private
router.post(
  "/",
  [
    auth,
    [
      check("plan", "Plan is required").not().isEmpty(),
      check("amount", "Amount is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { plan, amount, desc, date } = req.body;

    try {
      const newPlan = new Plan({
        plan,
        desc,
        amount,
        date,
        user: req.user.id,
      });

      const thePlan = await newPlan.save();

      res.json(thePlan);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route PUT api/plans/:id
//@desc  Update plan
//@access  Private
router.put("/:id", (req, res) => {
  res.send("Update plans");
});

//@route DELETE api/plans/:id
//@desc  Delete plan
//@access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete plans");
});

module.exports = router;
