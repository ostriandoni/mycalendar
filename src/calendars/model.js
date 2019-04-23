const mongoose = require('mongoose')
const { Schema } = mongoose

const CalendarSchema = Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  lastModified: { type: Date, default: null, select: false }
}, { id: true })

CalendarSchema.set('toJSON', { virtuals: true })

const CalendarModel = mongoose.model('Calendar', CalendarSchema)

module.exports = CalendarModel
