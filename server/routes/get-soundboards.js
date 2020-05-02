const passport = require('passport')
const strategy = require('../strategies/strategy')
const express = require('express')
const router = express.Router()

passport.use(strategy.jwtStrategy)

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, error) => {
  try {
    if (req.user.soundboards.length == 0) {
      res.send([])
    } else {
      res.send(req.user.soundboards)
    }
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
