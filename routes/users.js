import express from 'express'
import verifyToken from '../middleware/auth-middleware'
import usersController from '../controller/users'

let users = express.Router()

users.use(verifyToken)
  .get('/', usersController.usersGetAll)
  .get('/profile', usersController.usersGetProfile)
  .get('/:id', usersController.usersGetAllParamsid)
  .patch('/update/:id', usersController.usersPatchdetailsId)

export default users
