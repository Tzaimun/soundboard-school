const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth')
const express = require('express');
const app = express();

//  Middleware

mongoose.connect('mongodb://localhost/mongo-games')
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));

app.use(cors());
app.use(express.json());
app.use('/api/users', users)
app.use('/api/auth', auth)


const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Server started on port ${port}`));
