// grab the things we need
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  firstname: { 
    type: String, 
    required: true 
  },
  lastname : { 
    type: String, 
    required: true 
  },
  email    : { 
    type: String, 
    required: true, 
    unique: true 
  },
  password : { 
    type: String, 
    required: true 
  },
  gender   : { 
    type: String, 
    required: true 
  },
  day   : { 
    type: Number, 
    required: true 
  },
  month   : { 
    type: String, 
    required: true 
  },
  year   : { 
    type: Number, 
    required: true 
  },
  tokens: [{
    token: {
        type: String,
        required: true
    }
}]
});

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email})
  if (!user) {
      throw new Error('Invalid login credentials')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
      throw new Error('Invalid login credentials')
  }
  return user
}

var User = mongoose.model('User', userSchema);

module.exports = User;