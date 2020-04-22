const multer = require('multer')
const FILE_PATH  = 'uploads'
const passport = require('passport')
const strategy = require('../strategies/strategy')
const upload = multer({
  dest: `${FILE_PATH}/`
})
const { Soundboard } = require('../models/soundboard')
const express = require('express')
const router = express.Router()

passport.use(strategy.jwtStrategy)

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    console.log(req.body.name)
    console.log(req.user)
    //req.user.soundboards.push({
    //  name: req.body.name,
   // })
    console.log(req.user)
    await req.user.save()
    res.send('Success!')
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
