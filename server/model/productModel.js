const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  realprice: Number,
  description: String,
  photos: [String],
  mainphotos: String,
  subheading: String,
  reviews: Number,
  totalreviews: Number,
});

module.exports = mongoose.model("Product", productSchema);
