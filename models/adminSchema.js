const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    // required: true
  },
  gender: {
    type: String,
    // required: true
  },
  dob: {
    type: String,
    // required: true
  },
  role: {
    type: String,
    // required: true
  },
  city: {
    type: String,
    // required: true
  },
  avatar: {
    type: String,
    // required: true 
  },
  otp: {
    type: Number
  },

  otpExpire: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);