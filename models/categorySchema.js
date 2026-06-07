const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

  categoryName: {
    type: String,
    required: true
  },

  status: {
    type: Boolean,
    default: true
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Category", categorySchema);