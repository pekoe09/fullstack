const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
  isAdult: Boolean
})

userSchema.statics.format = (user) => {
  return {
    id: user._id,
    username: user.username,
    name: user.name,
    isAdult: user.isAdult
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User