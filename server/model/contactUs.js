const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  subject: {
    type: String,
  },
  usermessage: {
    type: String,
  },
});

module.exports = mongoose.model("ContactForm", contactSchema);
