const passport = require('passport')
const strategy = require('../strategies/strategy')
const express = require('express')
const router = express.Router()

passport.use(strategy.jwtStrategy)

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    try {
      const soundboard = req.user.soundboards.id(req.body._id)
      const old_name = soundboard.name
      soundboard.name = req.body.new_name
      req.user.save()
      res.send({
        message: `Succes! (${old_name}) has been changed to (${req.body.new_name})!`
      })
    } catch (err) {
      res.status(400).send('This file does not exist!')
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
