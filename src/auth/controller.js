const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../users/helper')

const AuthController = {
  async login(req, res, next) {
    const secret = process.env.secret
    const loginInfo = {
      username: req.body.username,
      password: req.body.password
    }
    const user = await User.getUserByUsername(loginInfo.username)
    if (user) {
      const isPasswordMatch = bcrypt.compareSync(loginInfo.password, user.password)
      if (isPasswordMatch) {
        const token = jwt.sign(loginInfo, secret, { expiresIn: 60 * 60 })
        return res.status(200)
          .json({ token })
      }
      return res.status(401)
        .json({
          error: true,
          status: 401,
          message: 'Wrong username or password.'
        })

    }
    return res.status(404)
      .json({
        error: true,
        status: 404,
        message: 'User not found.'
      })
  },

  async authorize(req, res, next) {
    const authHeader = req.headers.authorization
    if (authHeader) {
      const elements = authHeader.split(' ')
      if (elements.length !== 2) {
        return res.status(403)
          .json({
            error: true,
            status: 403,
            message: 'You are not logged in.'
          })
      }
      const [scheme, token] = elements
      let authorized
      if (scheme === 'Bearer') {
        try {
          authorized = jwt.verify(token, process.env.secret)
        } catch (err) {
          console.error(err)
          return res.status(401)
            .json({
              error: true,
              status: 401,
              message: 'Session timeout, please login again.'
            })
        }
        if (!authorized) {
          return res.status(403)
            .json({
              error: true,
              status: 403,
              message: 'You are not logged in.'
            })
        } else {
          const user = await User.getUserByUsername(authorized.username)
          req.currentUser = {
            id: user.id,
            username: user.username
          }
          next()
        }
      }
    } else {
      return res.status(401)
        .json({
          error: true,
          status: 401,
          message: 'No authorization token was found.'
        })
    }
  }
}

module.exports = AuthController
