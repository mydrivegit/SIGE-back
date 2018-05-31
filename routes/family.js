import express from 'express'
import verifyToken from '../middleware/auth-middleware'
import familyController from '../controller/family'

let family = express.Router()

family.use(verifyToken)
  .post('/', familyController.familyPost)
  .get('/', familyController.familyGetAll)
  .get('/:id', familyController.familyGetAllParamsid)
  .patch('/update/:id', familyController.familyPatchdetailsId)

export default family
