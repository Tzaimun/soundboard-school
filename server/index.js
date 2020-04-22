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
const multer = require('multer')
const express = require('express')
const app = express()

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
const uploadSound = require('./routes/upload-sound')
const deleteSound = require('./routes/delete-sound')
const retrieveSounds = require('./routes/retrieve_sounds')
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
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
  //Passport Authentication
app.use(passport.initialize())
app.use(passport.session())
passport.use(strategy.jwtStrategy)

  //  Check routes/auth.js and routes/users.js for these files.
app.use('/register', register)
app.use('/login', login)
app.use('/secret', secret)
app.use('/upload-sound', uploadSound)
app.use('/delete-sound', deleteSound)
app.use('/retrieve-sounds', retrieveSounds)

const port = process.env.PORT || 8081

app.listen(port, () => 
  console.log(`Server started on port ${port}`
))
