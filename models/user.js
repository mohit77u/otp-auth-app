const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    login_otp: {
        type: String,
        required: false,
        default: null,
    },
    login_attempt: {
        type: Number,
        required: false,
        default: 0,
    },
    
},{ timestamps: true });
  
// save password in encrypted form
userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// for forgot password check user exists or not
userSchema.statics.findByEmail = async(email) => {
    const user = await User.findOne({ email });
    return user;
};

// find By Username
userSchema.statics.findByUsername = async(username) => {
    const user = await User.findOne({ username });
    return user;
};


const User = mongoose.model('users', userSchema);
module.exports = User;