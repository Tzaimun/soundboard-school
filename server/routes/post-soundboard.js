const multer = require('multer')
const FILE_PATH  = 'uploads'
const passport = require('passport')
const strategy = require('../strategies/strategy')
const express = require('express')
const router = express.Router()

passport.use(strategy.jwtStrategy)

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  console.log(req.body.name + ' req.body.name')
  try {
    req.user.soundboards.push({
      name: req.body.name,
    })
    await req.user.save()
    res.send({
      message: 'Succes, a new soundboard has been created!',
      name: req.body.name
    })
  } catch (err) {
    res.status(500).send('Failed.')
  }
})

module.exports = router
