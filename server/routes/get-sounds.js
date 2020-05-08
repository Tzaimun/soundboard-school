const passport = require('passport')
const strategy = require('../strategies/strategy')
var fs = require('fs');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var gfs = Grid('mongodb://localhost/soundboard_school', mongoose.mongo);
const express = require('express')
const router = express.Router()

passport.use(strategy.jwtStrategy)

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  console.log(req.query)
  console.log(req.user)
  res.set('content-type', 'audio/mp3')
  res.set('accept-ranges', 'bytes')
  
  let bucket = createBucket()
  try {
    res.send('This is still in development!')
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
