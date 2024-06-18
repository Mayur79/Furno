const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  phnumber: {
    type: Number,
  },
  email: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
});

module.exports = mongoose.model("BillingDetails", billingSchema);
