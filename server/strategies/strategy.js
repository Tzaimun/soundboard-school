const passportJwt = require('passport-jwt')
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const { User } = require('../models/user')

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'infor warrior'

const jwtStrategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  console.log('payload recieved', jwt_payload);
  User.findOne({_id: jwt_payload._id}, (err, user) => {
    console.log(user)
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