const bcrypt = require('bcrypt')
const { User, validate } = require('../models/user')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {

  // Validate Request
  const { error } = validate(req.body)
  if (error) {
    return res.status(400).send({
      error: error.details[0].message,
      message: 'Validation failed!'
    })
  }

  //  Check if user already exists
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).send('This email is already in use, please try again')
  } else {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      sounds: []
    })
    //  Hash password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    res.send({
      message: `Thank you for registering with us, ${req.body.name}!`
    })
  }
})

module.exports = router