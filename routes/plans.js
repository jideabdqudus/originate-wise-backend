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
router.put("/:id", auth, async (req, res) => {
  const { plan, amount, desc, date } = req.body;

  //Build Plan Object

  const planFields = {};
  if (plan) planFields.plan = plan;
  if (amount) planFields.amount = amount;
  if (desc) planFields.desc = desc;
  if (date) planFields.date = date;

  try {
    let plan = await Plan.findById(req.params.id);

    if (!plan) return res.status(404).json({ msg: "Plan not found" });

    //Make sure user owns plan

    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    plan = await Plan.findByIdAndUpdate(
      req.params.id,
      {
        $set: planFields,
      },
      { new: true }
    );
    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/plans/:id
//@desc  Delete plan
//@access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let plan = await Plan.findById(req.params.id);

    if (!plan) return res.status(404).json({ msg: "Plan not found" });

    //Make sure user owns plan

    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Plan.findByIdAndRemove(req.params.id);

    res.json({ msg: "Plan Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
