const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  realprice: Number,
  description: String,
  reviews: [String],
  photos: [String],
  subheading: String,
});

module.exports = mongoose.model("Product", productSchema);
