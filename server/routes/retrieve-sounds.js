const passport = require('passport')
const express = require('express')
const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {

  try {
    console.log(req.user.soundboards)
    soundboard = req.user.soundboards.id(req.body._id)
    console.log(soundboard)
    if (soundboard) {
      res.send({
        message: 'Succes! There are the sounds you requested',
        soundboard: soundboard
      }) 
    } else {
      res.status(400).send('This soundboard does not exist!')
    }
   
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
