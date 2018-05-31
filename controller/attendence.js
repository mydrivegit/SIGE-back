import Attendence from '../models/attendence'
import moment from 'moment'

let attendencePost = (req, res, next) => {
  let attendence = new Attendence({
    memberId: req.body.memberId,
    classId: req.body.classId,
    subjectId: req.body.subjectId,
    member: req.body.member,
    comment: req.body.comment,
    dateOfAttendence: req.body.dateOfAttendence,
    status: req.body.status
  })
  attendence.save()
    .then(res.status(201)
      .send({
        success: true,
        message: 'Attendence created succesfully'
      }))
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

let attendenceGetParamsid = (req, res, next) => {
  const id = req.params.id
  Attendence.findById(id).exec().then((docs) => {
    if (docs) {
      res.status(201).send({
        message: 'Here is your details for the requested ID',
        docs
      })
    } else {
      res.status(204).send({
        message: 'Attendence not found'
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: 'Attendence not found',
      error: err.name
    })
  })
}

let attendenceGetMemberParamsid = (req, res, next) => {
  const id = req.params.id
  Attendence.find({ memberId: id })
    .populate('memberId classId subjectId')
    .then((docs) => {
      if (docs.length >= 1) {
        res.status(201).send({
          message: 'Here is your details for the requested ID',
          docs
        })
      } else {
        res.status(204).send({
          message: 'Class details of student is not found'
        })
      }
    }).catch(err => {
      console.log(err)
      res.status(500).send({
        message: 'Class details of student not found',
        error: err.name
      })
    })
}

let attendenceDelete = (req, res, next) => {
  const id = req.params.id
  Attendence.remove({ _id: id })
    .exec()
    .then(res.status(201)
      .send({
        success: true,
        message: 'Attendence deleted succesfully'
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error found while you delete the attendence',
          error: err.name
        })
      })
    )
}

let attendencePatchdetailsId = (req, res, next) => {
  const attendenceId = req.params.id
  const updateOps = {}
  if (req.body.dateOfAttendence) {
    req.body.dateOfAttendence = moment(moment(req.body.dateOfAttendence, 'DD/MM/YYYY').toDate()).add(1, 'hours')
  }
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  Attendence.update({ _id: attendenceId }, { $set: updateOps })
    .exec()
    .then((docs) => {
      res.status(201).send({
        message: 'Attendence details are altered succesfully',
        docs
      })
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

export default { attendencePost, attendenceGetParamsid, attendencePatchdetailsId, attendenceDelete, attendenceGetMemberParamsid }
