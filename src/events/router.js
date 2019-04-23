const express = require('express')
const router = express.Router()
const EventController = require('./controller')
const AuthController = require('../auth/controller')

router.use(AuthController.authorize)
router.post('/', EventController.create)
router.get('/', EventController.get)
router.get('/:id', EventController.get)
router.put('/:id', EventController.update)
router.delete('/:id', EventController.delete)

module.exports = router
