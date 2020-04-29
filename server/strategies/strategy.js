const passportJwt = require('passport-jwt')
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const { User } = require('../models/user')
const dotenv = require('dotenv')
dotenv.config()

/*let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET
*/
const jwtStrategy = new JwtStrategy({
  jwtFromRequest: req => {
    console.log(req.cookies['jwt'])
    req.cookies['jwt']
  },
  secretOrKey: process.env.JWT_SECRET
  },  (jwt_payload, done) => {
  User.findOne({_id: jwt_payload._id}, (err, user) => {
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
})

exports.jwtStrategy = jwtStrategy;