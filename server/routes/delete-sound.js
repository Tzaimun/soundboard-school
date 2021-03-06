const passport = require('passport')
const strategy = require('../strategies/strategy')
const express = require('express')
const router = express.Router()

passport.use(strategy.jwtStrategy)

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    soundboard = req.user.soundboards.id(req.body.parent_id)
    try {
    sound = soundboard.sounds.id(req.body._id).remove()
    req.user.save()
    res.send({
      message: `Succes! You have deleted (${sound.name})!`
    })
    } catch (err) {
      res.status(400).send('This file does not exist!')
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
