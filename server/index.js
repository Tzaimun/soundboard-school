/**
 *  Npm 
*/
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
require('dotenv').config()
/**
 *  NodeJS 
*/
const { Readable } = require('stream')

/**
 * Local
*/
const register = require('./routes/register')
const login = require('./routes/login')
const secret = require('./routes/secret')
const postSoundboard = require('./routes/post-soundboard')
const postSound = require('./routes/post-sound')
const deleteSoundboard = require('./routes/delete-soundboard')
const deleteSound = require('./routes/delete-sound')
const getSoundboards = require('./routes/get-soundboards')
const getSounds = require('./routes/get-sounds')
const editSoundboard = require('./routes/edit-soundboard')
const strategy = require('./strategies/strategy')

//  Database connection
mongoose.connect('mongodb://localhost/soundboard_school', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err))


//  ------------------------  Middleware  -----------------------

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
//app.use(cors())
app.use(express.json())
app.use(express.static('public'))
//app.use(session ({secret: process.env.JWT_SECRET}))
  //Passport Authentication
app.use(passport.initialize())
app.use(passport.session())
passport.use(strategy.jwtStrategy)

  //  Cors options
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true
}

app.options('/register', cors(corsOptions))
app.options('/login', cors(corsOptions));
app.options('/post-soundboard', cors(corsOptions))
app.options('/post-sound', cors(corsOptions))
app.options('/delete-soundboard', cors(corsOptions))
app.options('/delete-sound', cors(corsOptions))
app.options('/get-soundboards', cors(corsOptions))
app.options('/get-sounds', cors(corsOptions))
app.options('/edit-soundboard', cors(corsOptions))

app.use('/register',cors(corsOptions), register)
app.use('/login', cors(corsOptions), login)
app.use('/post-soundboard', cors(corsOptions), postSoundboard)
app.use('/post-sound', cors(corsOptions), postSound)
app.use('/delete-soundboard', cors(corsOptions), deleteSoundboard)
app.use('/delete-sound', cors(corsOptions), deleteSound)
app.use('/get-soundboards', cors(corsOptions), getSoundboards)
app.use('/get-sounds', cors(corsOptions), getSounds)
app.use('/edit-soundboard', cors(corsOptions), editSoundboard)

const port = process.env.PORT || 8081

app.listen(port, () => 
  console.log(`Server started on port ${port}`
))
