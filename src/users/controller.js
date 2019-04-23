const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./helper')
const Calendar = require('../calendars/helper')

const UserController = {
  async create(req, res, next) {
    const data = req.body
    const isEmailTaken = await User.getUserByEmail(data.email)
    if (isEmailTaken) {
      return res.status(403)
        .json({
          error: true,
          status: 403,
          message: 'Looks like you already created an account.'
        })
    }
    const isUsernameTaken = await User.getUserByUsername(data.username)
    if (isUsernameTaken) {
      return res.status(403)
        .json({
          error: true,
          status: 403,
          message: 'This username is already taken.'
        })
    }
    let user = new User(data)
    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(data.password, salt)
    user = await user.create()
    // create default calendar
    let calendar = new Calendar({
      name: `${user.username}-calendar`,
      owner: user.id
    })
    calendar.members.push(user.id)
    calendar = await calendar.create()
    user.calendars.push(calendar.id)
    user = await User.update(user.id, {
      calendars: user.calendars
    })
    return res.status(201)
      .json({ user })
  },

  async get(req, res, next) {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
      const user = await User.get(id)
      if (user) {
        return res.status(200)
          .json({ user })
      } else {
        return res.status(404)
          .json({
            error: true,
            status: 404,
            message: 'User not found.'
          })
      }
    } else {
      return res.status(404)
        .json({
          error: true,
          status: 404,
          message: 'User not found.'
        })
    }
  }
}

module.exports = UserController
