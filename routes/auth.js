import express from 'express'
import authController from '../controller/auth'
import verifyToken from '../middleware/auth-middleware'

let auth = express.Router()
auth.post('/login', authController.usersLoginIn)
auth.use(verifyToken)
  .post('/signup', authController.usersSignUp)

export default auth
