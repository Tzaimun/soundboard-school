const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const csrf = require('csurf')
const cors = require('cors')
const mongoose = require('mongoose')
const users = require('./routes/register')
const User = require('./models/user')
const auth = require('./routes/login')
const express = require('express')
const csrfProtection = csrf({ cookie: true})
const parseForm = bodyParser.urlencoded({ extended: false })

//  Database connection
mongoose.connect('mongodb://localhost/mongo-games')
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err))

const app = express()

//  ------------------------  Strategies  -----------------------'

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromHeader();
jwtOptions.secretOrKey = 'infor warrior'

passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  console.log('payload recieved', jwt_payload);
  User.findOne({id: jwt_payload._id}, (err, user) => {
    if (err) {
      return done(err, false)
    }

    if (user) {
      return done(null, user)
    } else {
      console.log('User doesnt exist.')
      return done(null, false)
    }
  })
}))

//  ------------------------  Middleware  -----------------------

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(cors())
app.use(express.json())
//app.use(express.static('public'))
//app.use(session({ secret: 'infor warrior'}))

  //Passport Authentication
//app.use(passport.initialize())
//app.use(passport.session())

  //  Check routes/auth.js and routes/users.js for these files.
app.use('/register', users)
app.use('/login', auth)

// --------------------------------------------------------------

//  Testing route.
app.get("/secret", passport.authenticate('jwt', { session: false }),
  function(req, res){
    res.json("Success! You can not see this without a token")
  }
)


const port = process.env.PORT || 8081

app.listen(port, () => 
  console.log(`Server started on port ${port}`
))
