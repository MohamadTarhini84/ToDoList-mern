const mongoose = require("mongoose");
const taskSchema = require("./task");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique:[true, "This username already exists"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [4, "Minimum password length is 4 characters"],
  },
  tasks: {
    type: [taskSchema],
    default: [],
  },
});

// userSchema.pre('save', async function(next){
//   const salt = await bcrypt.genSalt()
//   this.password= await bcrypt.hash(this.password, salt)
//   next()
// })

userSchema.statics.signup = async function(name, password) {
  const exists = await this.findOne({ username:name });
  if (exists) {
    throw Error("This username is already in use!");
  } else {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    const user = await this.create({ username: name, password: hashedPass });

    return user;
  }
};

userSchema.statics.login = async function(name, password){
  const user = await this.findOne({username:name})

  if(!user){
    throw Error("Make sure you've entered your email correctly")
  }

  const match= await bcrypt.compare(password, user.password)
  if(!match){
    throw Error("Make sure you've evntered your password correctly")
  }

  return user
}

module.exports = mongoose.model("user", userSchema);
