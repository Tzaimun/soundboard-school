const Joi = require('joi')
const bcrypt = require('bcrypt')
const { User } = require('../models/user')
const express = require('express')
const router = express.Router()
const generateToken = require('../tokens/jwt-generate')

router.post('/', async (req, res) => {

  // Validate Request
  const { error } = validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  //  Find user in DB
  let user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send('Email and/or password incorrect, please try again.')
  }

  //  Validate Password.
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).send('Email and/or password incorrect, please try again.')
  }

  //  _id is the payload.
  try {
    await generateToken(res, user._id)
    res.send({
      message: "Login succesful", user_id: user._id
    })
  } catch (err) {
    res.status(500).send(err)
  }
  
})

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  }

  return Joi.validate(req, schema)
}


module.exports = router
