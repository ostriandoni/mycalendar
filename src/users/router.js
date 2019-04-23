const express = require('express')
const router = express.Router()
const UserController = require('./controller')
const AuthController = require('../auth/controller')
const CalendarController = require('../calendars/controller')

router.use(AuthController.authorize)
router.get('/:id', UserController.get)

module.exports = router
