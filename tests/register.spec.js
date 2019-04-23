require('assert').equal(process.env.NODE_ENV, 'test')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()
const fixture = require('../src/lib/fixture')

chai.use(chaiHttp)

describe('Register', function () {
  const user = {
    firstName: 'Donny',
    lastName: 'Ostrianto',
    email: 'donny@mailinator.com',
    username: 'donny',
    password: 'hahaha'
  }

  before(async function () {
    await fixture.initDatabase()
  })

  it('should create user', function (done) {
    chai.request(server)
      .post('/register')
      .send(user)
      .end(function (err, res) {
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.user.should.have.property('firstName')
        res.body.user.should.have.property('lastName')
        res.body.user.should.have.property('email')
        res.body.user.should.have.property('password')
        res.body.user.should.have.property('username')
        done()
      })
  })
})
