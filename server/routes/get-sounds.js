const express = require('express')
const router = express.Router()
const passport = require('passport')
const strategy = require('../strategies/strategy')
passport.use(strategy.jwtStrategy)

const mongoose = require('mongoose')
const connection = mongoose.connection;
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

connection.once('open', () => {
  console.log(connection)
  console.log('db connection open duh!')
  gfs = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'uploads' })
})

passport.use(strategy.jwtStrategy)

router.get('/:filename', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const file = gfs
    .find({
      filename: req.query
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        })
      }
      gfs.openDownloadStreamByName(req.query).pipe(res)
    })
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
