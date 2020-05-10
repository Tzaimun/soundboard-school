const express = require('express')
const router = express.Router()
const passport = require('passport')
const strategy = require('../strategies/strategy')
passport.use(strategy.jwtStrategy)

const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose')
const connection = mongoose.connection;
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');


connection.once('open', () => {
  console.log(connection)
  console.log('db connection open duh!')
  gfs = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'uploads' })
})

const storage = new GridFsStorage({
  url: 'mongodb://localhost/soundboard_school',
  file: (req, file) => {
    console.log(req.query.parent_id)
    console.log(file)
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const parent_id = req.query.parent_id
        const fileInfo = {
          filename: parent_id,
          bucketName: 'uploads'
        }
        console.log(fileInfo)
        resolve(fileInfo)
      })
    })
  }
})

const upload = multer({
  storage
})


router.post('/', passport.authenticate('jwt', { session: false }), upload.single('sound'), async (req, res) => {
  //  console.log(req)
  console.log(req.file)
  try {
    sound = req.file
    const soundboard = req.user.soundboards.id(req.query.parent_id)
    console.log(soundboard)
    console.log(sound)
    soundboard.sounds.push({name: sound.originalname, _id: sound.id, parent_id: req.query.parent_id})
    await req.user.save()
    console.log(soundboard)
    res.send({
      status: true,
      message: 'Sound has been uploaded.',
    })
  } catch (err) {
    res.status(400).send(err)
  }













  /*  
  //const user = User.findById(req.user._id)
  console.log(connection.readyState.toString())
  try {
    const sound = req.file
    console.log(sound)
    if (!sound) {
      res.status(400).send({
        status: false,
        data: 'No sound has been selected.'
      })
    } else {
      console.log('before writestream!')
      console.log(sound.fieldname)
      let writestream = gfs.createWriteStream([])
      console.log('before .on("close")!')
      writestream.on('close', file => {
        console.log(file.filename)
      })  
      console.log('before readstream')
      fs.createReadStream('/uploads/').pipe(writestream)
      console.log('After readstream')
      res.send('File uploaded succesfully!')
    }
  } catch (err) {
    res.status(500).send(err)
  }
       /*
    } else {  
      if (sound.size <= 500000) {
        try {
          const soundboard = req.user.soundboards.id(req.body._id)
          soundboard.sounds.push({name: sound.originalname, path: sound.path, parent_id: req.body._id})
          await req.user.save()
          console.log(soundboard)
          res.send({
            status: true,
            message: 'Sound has been uploaded.',
            data: {
              name: sound.originalname,
              encoding: sound.encoding,
              mimetype: sound.mimetype,
              size: sound.size,
              path: sound.path
            }
          })
        } catch (err) {
          res.status(400).send(err)
        }
      } else {
        res.status(400).send({
          status: false,
          data: `The file is too large (${fileSizeToMB(sound)} MB). The maximum file size is 0.5MB`
        })
      }
    }

  } catch (err) {
    res.status(500).send('Mistake')
  }*/
})

module.exports = router
