import express from 'express'
import verifyToken from '../middleware/auth-middleware'
import classController from '../controller/class'

let classes = express.Router()

classes.use(verifyToken)
  .post('/', classController.classPost)
  .get('/', classController.classGetAll)
  .get('/ClassDetailsOfMember/:id', classController.ClassGetDetailsOfMember)
  .get('/:id', classController.classGetAllParamsid)
  .patch('/update/:id', classController.classPatchdetailsId)
  .patch('/updateDetail/:id', classController.classPatchStudentId)
  .patch('/pullDetail/:id', classController.classPullStudentId)

export default classes
