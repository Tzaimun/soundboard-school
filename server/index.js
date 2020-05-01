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
const uploadSoundboard = require('./routes/upload-soundboard')
const uploadSound = require('./routes/upload-sound')
const deleteSoundboard = require('./routes/delete-soundboard')
const deleteSound = require('./routes/delete-sound')
const retrieveSoundboards = require('./routes/retrieve-soundboards')
const retrieveSounds = require('./routes/retrieve-soundpaths')
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
app.use('/register',cors(corsOptions), register)
app.options('/login', cors(corsOptions));
app.use('/login', cors(corsOptions), login)
app.use('/secret', secret)
app.options('/register', cors(corsOptions))
app.use('/upload-soundboard', cors(corsOptions), uploadSoundboard)
app.use('/upload-sound', uploadSound)
app.options('/delete-soundboards', cors(corsOptions))
app.use('/delete-soundboard', cors(corsOptions), deleteSoundboard)
app.use('/delete-sound', deleteSound)
app.options('/retrieve-soundboards', cors(corsOptions))
app.use('/retrieve-soundboards', cors(corsOptions), retrieveSoundboards)
app.use('/retrieve-sounds', retrieveSounds)
app.use('/edit-soundboard', editSoundboard)

const port = process.env.PORT || 8081

app.listen(port, () => 
  console.log(`Server started on port ${port}`
))
