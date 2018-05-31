import express from 'express'
import verifyToken from '../middleware/auth-middleware'
import memberController from '../controller/member'

let member = express.Router()

member.use(verifyToken)
  .post('/', memberController.memberPost)
  .get('/', memberController.memberGetAll)
  .put('/family', memberController.memberGetFamilyId)
  .get('/:id', memberController.memberGetAllParamsid)
  .patch('/update/:id', memberController.memberPatchdetailsId)

export default member
