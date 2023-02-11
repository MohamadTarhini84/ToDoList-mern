const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    unique:true,
    required: true,
  },
  description: {
    type:String,
    default: "No description provided."
  }
}, {timestamps:true});

module.exports = taskSchema;