const multer = require('multer')
const FILE_PATH  = 'uploads'
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

router.post('/', upload.single('sound'), async (req, res) => {
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
            size: sound.size
          }
        })
      } else {
        res.status(400).send({
          status: false,
          data: `The file is too large (${fileSizeToMB(sound)} MB). The maximum file size is 0.5MB`
        })
      }
      
    }
  } catch (err) {
    res.status(500).send('It doesnt work lol')
  }
})

module.exports = router
