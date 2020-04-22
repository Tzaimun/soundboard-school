const passport = require('passport')
const strategy = require('../strategies/strategy')
const express = require('express')
const router = express.Router()

passport.use(strategy.jwtStrategy)

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const deleteSounds = req.body
    const user = req.user
    const sounds = user.sounds
    let found = false
    for (let i = 0; i < deleteSounds.length; i++) {
      for (let j = 0; j < sounds.length; j++) {
        if (deleteSounds[i]._id == sounds[j]._id) {
          sounds.splice(sounds[j], 1)
          found = true
          break
        }
      }
    }
    user.save()
    if (found == false) {
      res.status(400).send('This sound was not found.')
    } else { 
      res.send({
        message: 'Succes!',
        sounds: user.sounds
      }
    )}
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
