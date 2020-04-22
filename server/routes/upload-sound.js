const multer = require('multer')
const FILE_PATH  = 'uploads'
const passport = require('passport')
const strategy = require('../strategies/strategy')
const upload = multer({
  dest: `${FILE_PATH}/`
})
const { User } = require('../models/user')
const express = require('express')
const router = express.Router()

function fileSizeToMB(file) {
  mbFileSize = file.size / 1000000
  mbFileSize = +mbFileSize.toFixed(2)
  return mbFileSize
}

passport.use(strategy.jwtStrategy)

router.post('/', passport.authenticate('jwt', { session: false }), upload.single('sound'), async (req, res) => {
  //const user = User.findById(req.user._id)
  try {
    const sound = req.file
    console.log(req.user)
    if (!sound) {
      res.status(400).send({
        status: false,
        data: 'No sound has been selected.'
      })
    } else {
      if (sound.size <= 500000) {
        try {
          const soundboard = req.user.soundboards.id(req.body._id)
          console.log(soundboard)
        } catch (err) {
          res.status(400).send('Inproper id!')
        }
        //console.log(soundboard._id)
        //await req.user.soundboard.id(req.body._id)
        soundboard.sounds.push({name: sound.originalname, path: sound.path, _id: req.user.sounds.length})
        //console.log(newSounds)
        //await req.user.updateOne({_id: req.user._id}, {sounds: newSounds})
        //console.log(soundboard)
        await req.user.save()
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
      } else {
        res.status(400).send({
          status: false,
          //data: `The file is too large (${fileSizeToMB(sound)} MB). The maximum file size is 0.5MB`
          data: `Error: The file is too large.`
        })
      }
    }
  } catch (err) {
    res.status(500).send('Mistake')
}})

module.exports = router
