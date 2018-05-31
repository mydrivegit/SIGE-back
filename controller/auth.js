import bcrypt from 'bcryptjs'
import dotEnv from 'dotenv'
import User from '../models/user'
import jwt from 'jsonwebtoken'
//  dotenv config
dotEnv.config()

let usersSignUp = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.lenght >= 1) {
        return res.status(409).json({
          message: 'User already exits'
        })
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            res.status(201).send({
              message: err.message
            })
          } else {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) {
                res.status(201).send(err)
              } else {
                let user = new User({
                  password: hash,
                  username: req.body.username,
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  email: req.body.email,
                  mobileNo: req.body.mobileNo,
                  role: req.body.role
                })
                user.save().then((result) => {
                  res.status(201).send({
                    message: 'User created Successfully',
                    user
                  })
                }).catch((err) => {
                  res.status(500).json({
                    message: err.message
                  })
                })
              }
            })
          }
        })
      }
    })
}

let usersLoginIn = (req, res, next) => {
  User.find({ email: req.body.email })
    // { $or: [{ _id: req.body.username }, { username: req.body.username }] }
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Authentication failed'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, function (err, result) {
        if (err) {
          return res.status(401).json({
            message: 'Authentication failed'
          })
        }
        if (result) {
          let token = jwt.sign({
            username: user[0].username,
            userId: user[0]._id,
            userRole: user[0].role
          }, process.env.JWT_SCRT1, { expiresIn: '1d' })
          // let refreshToken = jwt.sign({ userDetail }, process.env.JWT_SCRT2, { expiresIn: '1d' })
          let response = {
            // message: 'Logged in',
            token
            // refreshToken
          }
          return res.status(200).json(response)
        }
        return res.status(401).json({
          message: 'Authentication failed'
        })
      })
    })
    .catch({
      message: 'Authentication failed'
    })
}

export default { usersLoginIn, usersSignUp }
