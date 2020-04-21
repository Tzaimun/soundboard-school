const passport = require('passport')
const express = require('express')
const router = express.Router()

//  example push


router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {

  if (req.user.sounds.length == 0) {
    res.status(400).send("You do not have any sounds.")
  } else {
    res.send(req.user.sounds)
  }
})



module.exports = router
