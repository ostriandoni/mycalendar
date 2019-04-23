const _ = require('lodash')
const moment = require('moment')
const EventModel = require('./model')

class Event {
  constructor(opts) {
    this.name = opts.name
    this.owner = opts.owner
    this.usersInTheEvent = opts.usersInTheEvent
    this.startDateTime = opts.startDateTime
    this.endDateTime = opts.endDateTime
    this.location = opts.location || ''
    this.calendar = opts.calendar
  }

  create() {
    return new Promise((resolve, reject) => {
      EventModel.create(this)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static get(id) {
    return new Promise((resolve, reject) => {
      EventModel.findById(id)
        .populate('owner', 'firstName lastName username calendars')
        .populate({
          path: 'usersInTheEvent',
          populate: {
            path: 'calendars'
          }
        })
        .populate('events', 'name startDatetime')
        .then((calendar) => {
          resolve(calendar)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static update(id, opts) {
    return new Promise((resolve, reject) => {
      EventModel.findByIdAndUpdate(id, {
        $set: opts,
        $currentDate: {
          lastModified: true
        }
      }, {
          multi: true,
          new: true
        })
        .then((calendar) => {
          resolve(calendar)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static remove(id) {
    return new Promise((resolve, reject) => {
      EventModel.findByIdAndRemove(id)
        .then((calendar) => {
          resolve(calendar)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static getAll(params) {
    if (!_.has(params, 'name')) {
      delete params.name
    }
    if (!_.has(params, 'date')) {
      delete params.date
    } else {
      const date = moment(params.date).startOf('day').toDate()
      params.startDateTime = { $gte: date }
      delete params.date
    }
    return new Promise((resolve, reject) => {
      EventModel.find(params)
        .then((event) => {
          resolve(event)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

module.exports = Event
