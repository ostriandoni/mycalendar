const UserModel = require('./model')

class User {
  constructor(opts) {
    this.firstName = opts.firstName || ''
    this.lastName = opts.lastName || ''
    this.email = opts.email || ''
    this.username = opts.username || ''
    this.password = opts.password || ''
    this.calendars = opts.calendars || []
  }

  create() {
    return new Promise((resolve, reject) => {
      UserModel.create(this)
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
      UserModel.findById(id)
        .populate('calendars', 'name owner events')
        .then((user) => {
          resolve(user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({
        email
      })
        .then((user) => {
          if (user) {
            resolve(user)
          } else {
            resolve(false)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({
        username
      })
        .then((user) => {
          if (user) {
            resolve(user)
          } else {
            resolve(false)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static update(id, opts) {
    return new Promise((resolve, reject) => {
      UserModel.findByIdAndUpdate(id, {
        $set: opts,
        $currentDate: {
          lastModified: true
        }
      }, {
          multi: true,
          new: true
        })
        .then((user) => {
          resolve(user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

module.exports = User
