const multer = require('multer')
const FILE_PATH  = 'uploads'
const passport = require('passport')
const strategy = require('../strategies/strategy')
const upload = multer({
  dest: `${FILE_PATH}/`
})
const express = require('express')
const router = express.Router()

function fileSizeToMB(file) {
  mbFileSize = file.size / 1000000
  mbFileSize = +mbFileSize.toFixed(2)
  return mbFileSize
}

passport.use(strategy.jwtStrategy)

router.post('/', passport.authenticate('jwt', { session: false }), upload.single('sound'), async (req, res) => {
  try {
    const sound = req.file
    console.log(sound)
    if (!sound) {
      res.status(400).send({
        status: false,
        data: 'No sound has been selected.'
      })
    } else {
      if (sound.size <= 500000) {
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
        let newSounds = req.user.sounds 
        newSounds.push({name: sound.originalname, path: sound.path, _id: req.user.sounds.length})
        console.log(req.user)
        await req.user.updateOne({_id: req.user._id}, {sounds: newSounds})
        await req.user.save()
      } else {
        res.status(400).send({
          status: false,
          data: `The file is too large (${fileSizeToMB(sound)} MB). The maximum file size is 0.5MB`
        })
      }
      
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
