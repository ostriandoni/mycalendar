const _ = require('lodash')
const mongoose = require('mongoose')
const moment = require('moment')
const Event = require('./helper')
const Calendar = require('../calendars/helper')
const User = require('../users/helper')

const EventController = {
  async create(req, res, next) {
    const data = req.body
    data.owner = mongoose.Types.ObjectId(req.currentUser.id)
    if (!data.name) {
      return res.status(403)
        .json({
          error: true,
          status: 403,
          message: 'Event name should be defined.'
        })
    }
    if (!data.startDateTime || !data.endDateTime) {
      return res.status(403)
        .json({
          error: true,
          status: 403,
          message: 'Both startDateTime and endDateTime should be defined.'
        })
    }
    data.startDatetime = moment(data.startDatetime)
    data.endDateTime = moment(data.endDateTime)
    if (data.usersInTheEvent.length < 1) {
      return res.status(403)
        .json({
          error: true,
          status: 403,
          message: 'Users in the event should be defined.'
        })
    }
    data.usersInTheEvent.push(data.owner)
    let calendar
    if (data.calendarId && mongoose.Types.ObjectId.isValid(data.calendarId)) {
      calendar = await Calendar.get(data.calendarId)
      data.calendar = data.calendarId
      delete data.calendarId
    }
    if (!calendar) {
      return res.status(404)
        .json({
          error: true,
          status: 404,
          message: 'Calendar not found.'
        })
    }
    let event = new Event(data)
    event = await event.create()
    calendar.events.push(event.id)
    calendar = await Calendar.update(calendar.id, calendar)
    for (const userId of data.usersInTheEvent) {
      if (userId != data.owner) {
        tempUser = await User.get(userId)
        if (!tempUser)
          return
        let [tempCalendar] = tempUser.calendars
        tempCalendar.events.push(event.id)
        calendar = await Calendar.update(tempCalendar._id, {
          events: tempCalendar.events
        })
      }
    }
    return res.status(201)
      .json({ event })
  },

  async get(req, res, next) {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
      const event = await Event.get(id)
      if (event) {
        return res.status(200)
          .json({ event })
      } else {
        return res.status(404)
          .json({
            error: true,
            status: 404,
            message: 'Event not found.'
          })
      }
    } else {
      const query = req.query
      const event = await Event.getAll(query)
      if (event) {
        return res.status(200)
          .json({ event })
      } else {
        return res.status(404)
          .json({
            error: true,
            status: 404,
            message: 'Event not found.'
          })
      }
    }
  },

  async update(req, res, next) {
    const data = req.body
    let event = await Event.get(req.params.id)
    if (!event) {
      return res.status(404)
        .json({
          error: true,
          status: 404,
          message: 'Event not found.'
        })
    }
    if (event.owner._id == req.currentUser.id) {
      if (!data.startDateTime || !data.endDateTime) {
        return res.status(403)
          .json({
            error: true,
            status: 403,
            message: 'Both startDateTime and endDateTime should be defined.'
          })
      }
      data.startDatetime = moment(data.startDatetime)
      data.endDateTime = moment(data.endDateTime)
      if (data.usersInTheEvent.length < 1) {
        return res.status(403)
          .json({
            error: true,
            status: 403,
            message: 'Users in the event should be defined.'
          })
      }
      isOwnerExist = _.find(data.usersInTheEvent, u => u == req.currentUser.id)
      if (!isOwnerExist) {
        data.usersInTheEvent.push(req.currentUser.id)
      }
      event = await Event.update(event.id, data)
      return res.json({ event })
    } else {
      return res.status(403)
        .json({
          error: true,
          status: 403,
          message: 'Unable to update event since you\'re not the owner.'
        })
    }
  },

  async delete(req, res, next) {
    let event = await Event.get(req.params.id)
    if (!event) {
      return res.status(404)
        .json({
          error: true,
          status: 404,
          message: 'Event not found.'
        })
    }
    if (event.owner._id == req.currentUser.id) {
      for (const user of event.usersInTheEvent) {
        for (let calendar of user.calendars) {
          _.remove(calendar.events, event => event == req.params.id)
          await Calendar.update(calendar.id, {
            events: calendar.events
          })
        }
      }
      await Event.remove(req.params.id)
      return res.json({
        event: req.params.id,
        deleted: true
      })
    } else {
      return res.status(403)
        .json({
          error: true,
          status: 403,
          message: 'Unable to delete event since you\'re not the owner.'
        })
    }
  }
}

module.exports = EventController
