import mongoose from 'mongoose'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import dotEnv from 'dotenv'
dotEnv.config()

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URL, {}, (err) => {
  if (err) {
    throw err
  } else {
    console.log('connected with Mlab')
    let user = new User({
      username: 'admin',
      password: bcrypt.hashSync('admin', 10),
      firstname: 'admin',
      lastname: 'admin',
      mobileNo: '0600000000',
      role: 'Admin',
      email: 'admin@g.com'
    })
    user.save(() => {
      setTimeout(() => {
        console.log('Super-user seeding is complete')
        mongoose.connection.close()
      }, 3000)
    })
  }
})
