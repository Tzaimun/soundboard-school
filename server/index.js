const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const csrf = require('csurf')
const cors = require('cors')
const mongoose = require('mongoose')
const users = require('./routes/users')
const auth = require('./routes/auth')
const express = require('express')

//  Route middlewares

const csrfProtection = csrf({ cookie: true})
const parseForm = bodyParser.urlencoded({ extended: false })

//  Create app

const app = express()
app.set('view engine', 'jade')
//  Middleware

mongoose.connect('mongodb://localhost/mongo-games')
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err))

app.use(cookieParser())
app.use(cors())
app.use(express.json())

//  Check routes/auth.js and routes/users.js for these files.
app.use('/api/users', users)
app.use('/api/auth', auth)

//  Test to see if backend is working (too lazy to go to cmd prompt :P)
app.get('/status', (req, res) => {
  res.send({
    message: 'Server is still alive.'
  })
})

const port = process.env.PORT || 8081

app.listen(port, () => 
  console.log(`Server started on port ${port}`
))
