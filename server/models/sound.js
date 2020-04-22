const Joi = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Sound =  new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  path: {
    type: String,
    required: true
  }
})

exports.Sound = Sound
