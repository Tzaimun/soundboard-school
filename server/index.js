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
const uploadSound = require('./routes/upload-sound')
const strategy = require('./strategies/strategy')

//  Database connection
mongoose.connect('mongodb://localhost/mongo-games')
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
app.use(session({ secret: 'infor warrior'}))

  //Passport Authentication
app.use(passport.initialize())
app.use(passport.session())
passport.use(strategy.jwtStrategy)

  //  Check routes/auth.js and routes/users.js for these files.
app.use('/register', register)
app.use('/login', login)
app.use('/upload-sound', uploadSound)

  //  Testing route.
app.get("/secret", passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send({
      message: "Success! You can not see this without a token"
      //res.
    })
  }
)

const port = process.env.PORT || 8081

app.listen(port, () => 
  console.log(`Server started on port ${port}`
))
