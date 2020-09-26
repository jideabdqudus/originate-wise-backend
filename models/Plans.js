const mongoose = require("mongoose");

const PlanSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  plan: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  amount: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("plan", PlanSchema);
