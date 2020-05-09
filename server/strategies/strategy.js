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

const cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies)
  {
      token = req.cookies['jwt'];
  }
  return token;
};


const jwtStrategy = new JwtStrategy({
  jwtFromRequest: req => {
    //console.log(cookieExtractor(req) + ' jwtFromRequest cookie consolelog')
    return cookieExtractor(req)
  },
  secretOrKey: process.env.JWT_SECRET
  },  (jwt_payload, done) => {
  //console.log(jwt_payload + 'Payload log before find user')
  User.findOne({_id: jwt_payload._id}, (err, user) => {
    //console.log(jwt_payload + 'Payload log after find user')
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