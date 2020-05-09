const jwt = require('jsonwebtoken');

const generateToken = (res, _id, ) => {
  const expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d',
  });
  console.log(token)
  return res.cookie('jwt', token, {
    expires: new Date(Date.now() + expiration),
    //secure: false,
    httpOnly: true
  })
}

module.exports = generateToken
