const multer = require('multer')
const FILE_PATH  = 'uploads'
const upload = multer({
  dest: `${FILE_PATH}/`
})
const express = require('express')
const router = express.Router()

router.post('/upload-sound', upload.single('sound'), async (req, res) => {
  try {
    const sound = req.file
    console.log(sound)
    if (!sound) {
      res.status(400).send({
        status: false,
        data: 'No sound has been selected.'
      })
    } else {
      res.send({
        status: true,
        message: 'Sound has been uploaded.',
        data: {
          name: sound.originalname
        }
      })
    }
  } catch (err) {
    res.status(500).send('It doesnt work lol')
  }
})

module.exports = router
