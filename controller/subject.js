import Subject from '../models/subject'
import moment from 'moment'

let subjectPost = (req, res, next) => {
  let subject = new Subject({
    code: req.body.code,
    name: req.body.name,
    addedDate: req.body.addedDate,
    status: req.body.status
  })
  subject.save()
    .then(res.status(201)
      .send({
        success: true,
        message: 'Subject created succesfully'
      }))
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

let subjectGetAll = (req, res, next) => {
  Subject.find()
    .exec().then((docs) => {
      res.status(200).send({
        message: 'Here is the list of Subjects and their details',
        success: true,
        docs
      })
    }).catch((err) => {
      res.status(500).send(err.message)
    })
}

let subjectGetAllParamsid = (req, res, next) => {
  const id = req.params.id
  Subject.findById(id).exec().then((docs) => {
    if (docs) {
      res.status(201).send({
        message: 'Here is your details for the requested ID',
        docs
      })
    } else {
      res.status(204).send({
        message: 'Subject not found'
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: 'Subject not found',
      error: err.name
    })
  })
}

let subjectPatchdetailsId = (req, res, next) => {
  const subjectId = req.params.id
  const updateOps = {}
  if (req.body.addedDate) {
    req.body.addedDate = moment(moment(req.body.addedDate, 'DD/MM/YYYY').toDate()).add(1, 'hours')
  }
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  Subject.update({ _id: subjectId }, { $set: updateOps })
    .exec()
    .then((docs) => {
      res.status(201).send({
        message: 'Subject details are altered succesfully',
        docs
      })
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

export default { subjectPost, subjectGetAll, subjectPatchdetailsId, subjectGetAllParamsid }
