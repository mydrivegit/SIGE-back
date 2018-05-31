// Basic Import Modules
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
// import users package from users
import auth from './routes/auth'
import users from './routes/users'
import member from './routes/member'
import family from './routes/family'
import classes from './routes/class'
import email from './routes/email'
import subject from './routes/subject'
import attendence from './routes/attendence'

//  app express
let app = express()

//  dotenv config
dotenv.config()

// morgan error handling config
app.use(morgan('dev'))

//  cors config
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//  Diecting to users file in models folder
app.use('/auth', auth)
app.use('/users', users)
app.use('/member', member)
app.use('/family', family)
app.use('/classes', classes)
app.use('/email', email)
app.use('/subject', subject)
app.use('/attendence', attendence)

//  Handling error if there any wrong Url is requested
app.use((req, res, next) => {
  const err = new Error('Url is not found')
  err.status = 404
  next(err)
})
//  Handling error if there any wrong Url is requested
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    err: {
      message: err.message
    }
  })
})

mongoose.Promise = global.Promise
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
if (env === 'development') {
  mongoose.connect('mongodb://localhost:' + process.env.MONGOSERVERPORT + '/sige', {}, (err) => {
    if (err) {
      throw err
    } else {
      console.log('Mongodb connected on port:' + process.env.MONGOSERVERPORT)
      let port = process.env.PORT || 3000
      app.listen(port, () => console.log('SIGE app for backend precess is listening on port ' + port + '!'))
    }
  })
} else {
  mongoose.connect(process.env.MONGODB_URL, {}, (err) => {
    if (err) {
      throw err
    } else {
      console.log('Mongodb connected with MLAB')
      let port = process.env.PORT || 3000
      app.listen(port, () => console.log('SIGE app for backend precess is listening on port ' + port + '!'))
    }
  })
}
