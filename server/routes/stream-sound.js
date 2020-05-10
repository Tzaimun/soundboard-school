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

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    console.log(req.query)
    const file = gfs
      .find({
        filename: req.query.filename
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          console.log('cant find em!')
          res.status(404).send('Couldnt find file')
        } else {
        console.log(files)
        gfs.openDownloadStreamByName(req.query.filename).pipe(res)
        }
      })
    //  console.log(file)
    //console.log(req.query)
    //console.log(req.user.soundboards[0].sounds)
  } catch (err) {
    res.send('In development')
  }
})

module.exports = router
