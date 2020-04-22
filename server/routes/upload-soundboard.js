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
    req.user.soundboards.push({
      name: req.body.name,
    })
    await req.user.save()
    console.log(req.user)
    res.send({
      message: 'Succes, a new soundboard has been created!',
      name: req.body.name
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
