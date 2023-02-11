const mongoose = require("mongoose");
const taskSchema = require("./task")
const bcrypt=require("bcrypt")

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required: [true, "Username is required"],
    unique:true
  },
  password:{
    type: String,
    required: [true, "Password is required"],
    minlength: [4, "Minimum password length is 4 characters"]
  },
  tasks:{
    type:[taskSchema],
    default: []
  }
});

userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt()
  this.password= await bcrypt.hash(this.password, salt)
  next()
})

module.exports = mongoose.model("user", userSchema);