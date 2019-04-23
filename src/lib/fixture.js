require('dotenv').config()

const _ = require('lodash')
const mongoose = require('mongoose')
const User = require('../users/helper')
const Calendar = require('../calendars/helper')
const Event = require('../events/helper')
const UserModel = require('../users/model')
const CalendarModel = require('../calendars/model')
const EventModel = require('../events/model')
const helper = {}

// tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_TEST_URI, {
  useCreateIndex: true,
  useNewUrlParser: true
})
mongoose.connection
  .once('open', () => console.log('Connected to db test!'))
  .on('error', (error) => {
    console.warn('Error : ', error)
  })

let _sequentialIntCounter = 1
function sequentialInt() {
  return _sequentialIntCounter++
}

function randomInt(max) {
  return Math.ceil(Math.random() * max)
}

helper.initDatabase = async function () {
  await UserModel.remove({})
  await CalendarModel.remove({})
  await EventModel.remove({})
}

helper.createUser = async function (overrideParams) {
  const firstName = 'user'
  const lastName = sequentialInt(100)
  const params = {
    firstName,
    lastName,
    email: 'user' + sequentialInt(100) + '@mailinator.com',
    username: `${firstName}${lastName}`,
    password: randomInt(999999)
  }
  _.assign(params, overrideParams)
  let user = new User(params)
  user = await user.create()
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
  return user
}

module.exports = helper
