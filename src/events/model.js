const mongoose = require('mongoose')
const { Schema } = mongoose

const EventSchema = Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  usersInTheEvent: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  calendar: { type: Schema.Types.ObjectId, ref: 'Calendar' },
  location: String,
  lastModified: { type: Date, default: null, select: false }
}, { id: true })

EventSchema.set('toJSON', { virtuals: true })

const EventModel = mongoose.model('Event', EventSchema)

module.exports = EventModel
