const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    unique:[true, "This task already exists"],
    required: [true,"Please enter a task"]
  },
  description: {
    type:String,
    default: "No description provided."
  }
}, {timestamps:true});

module.exports = taskSchema;