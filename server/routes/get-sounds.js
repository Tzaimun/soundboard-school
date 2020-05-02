const passport = require('passport')
const strategy = require('../strategies/strategy')
const express = require('express')
const router = express.Router()

passport.use(strategy.jwtStrategy)

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, error) => {
  console.log(req.query)
  console.log(req.user)
  try {
    res.send('This is still in development!')
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
