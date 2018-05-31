import express from 'express'
import verifyToken from '../middleware/auth-middleware'
import attendenceController from '../controller/attendence'

let attendence = express.Router()

attendence.use(verifyToken)
  .post('/', attendenceController.attendencePost)
  .get('/:id', attendenceController.attendenceGetParamsid)
  .delete('/:id', attendenceController.attendenceDelete)
  .get('/member/:id', attendenceController.attendenceGetMemberParamsid)
  .patch('/update/:id', attendenceController.attendencePatchdetailsId)

export default attendence
