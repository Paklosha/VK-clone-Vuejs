// grab the things we need
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  lastActivity: { 
    type: Date, 
    default: new Date() 
  },
  isOnline: { 
    type: Boolean, 
    default: false 
  },
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
  status   : { 
    type: String, 
    default: ''
  },
  notifications: {
    messages: {type: Number,default: 0},
    friends: {type: Number,default: 0},
    news: {type: Number,default:0} 
  },
  avatar: { 
    type: String, 
    default: ''
  },
  photos: { 
    type: [String]
  },
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