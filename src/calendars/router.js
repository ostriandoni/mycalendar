const express = require('express')
const router = express.Router()
const CalendarController = require('./controller')
const AuthController = require('../auth/controller')

router.use(AuthController.authorize)
router.post('/', CalendarController.create)
router.get('/:id', CalendarController.get)

module.exports = router
