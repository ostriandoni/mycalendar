const mongoose = require('mongoose')
const Calendar = require('./helper')
const User = require('../users/helper')

const CalendarController = {
  async create(req, res, next) {
    const data = req.body
    data.owner = mongoose.Types.ObjectId(req.currentUser.id)
    let calendar = new Calendar(data)
    calendar = await calendar.create()
    let user = await User.get(data.owner)
    user.calendars.push(calendar.id)
    user = await User.update(user.id, user)
    return res.status(201)
      .json({ calendar })
  },

  async get(req, res, next) {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
      const calendar = await Calendar.get(id)
      if (calendar) {
        return res.status(200)
          .json({ calendar })
      } else {
        return res.status(404)
          .json({
            error: true,
            status: 404,
            message: 'Calendar not found.'
          })
      }
    } else {
      return res.status(404)
        .json({
          error: true,
          status: 404,
          message: 'Calendar not found.'
        })
    }
  }
}

module.exports = CalendarController
