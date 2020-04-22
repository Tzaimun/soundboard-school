const Joi = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SoundSchema = require('./sound')
//console.log(SoundSchema)

const Soundboard = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  sounds: {
    type: [SoundSchema],
    required: false
  }
})

exports.Soundboard = Soundboard