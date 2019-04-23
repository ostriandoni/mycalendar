const express = require('express')
const router = express.Router()
const UserController = require('../users/controller')
const AuthController = require('../auth/controller')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
router.post('/register', UserController.create)
router.post('/login', AuthController.login)

module.exports = router
