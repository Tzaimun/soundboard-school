const passport = require('passport')
const strategy = require('../strategies/strategy')
const express = require('express')
const router = express.Router()

passport.use(strategy.jwtStrategy)
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.soundboards.length == 0) {
    res.status(400).send("You do not have any soundboards.")
  } else {
    res.send(`Succes! These are your soundboards ${req.user.soundboards}`)
  }
})

module.exports = router
