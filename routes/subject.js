import express from 'express'
import verifyToken from '../middleware/auth-middleware'
import subjectController from '../controller/subject'

let subject = express.Router()

subject.use(verifyToken)
  .post('/', subjectController.subjectPost)
  .get('/', subjectController.subjectGetAll)
  .get('/:id', subjectController.subjectGetAllParamsid)
  .patch('/update/:id', subjectController.subjectPatchdetailsId)

export default subject
