const CalendarModel = require('./model')

class Calendar {
  constructor(opts) {
    this.name = opts.name
    this.owner = opts.owner || ''
    this.members = opts.members || []
    this.events = opts.events || []
  }

  create() {
    return new Promise((resolve, reject) => {
      CalendarModel.create(this)
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
      CalendarModel.findById(id)
        .populate('owner', 'firstName lastName username')
        .populate('members', 'firstName lastName username')
        .populate('events', 'name startDateTime location')
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
      CalendarModel.findByIdAndUpdate(id, {
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
}

module.exports = Calendar
