const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = Schema({
  firstName: String,
  lastName: String,
  email: { type: String, index: true },
  username: { type: String, index: true },
  password: String,
  calendars: [{ type: Schema.Types.ObjectId, ref: 'Calendar' }],
  lastModified: { type: Date, default: null, select: false }
})

UserSchema.set('toJSON', { virtuals: true })

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
