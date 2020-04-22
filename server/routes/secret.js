const passport = require('passport')
const strategy = require('../strategies/strategy')
const express = require('express')
const router = express.Router()

passport.use(strategy.jwtStrategy)

router.post('/', passport.authenticate('jwt', { session: false }),(req, res) => {
  res.send({
    message: 'Success! You can not see this without a token'
  })
})


module.exports = router
