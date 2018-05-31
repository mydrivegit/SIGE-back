import Family from '../models/family'
import moment from 'moment'

let familyPost = (req, res, next) => {
  let family = new Family({
    title: req.body.title,
    registeredOn: req.body.registeredOn,
    year: req.body.year,
    type: req.body.type,
    status: req.body.status,
    validatedOn: req.body.validatedOn,
    code: req.body.code,
    comments: req.body.comments,
    inCharge: req.body.inCharge
  })
  family.save()
    .then(res.status(201)
      .send({
        success: true,
        message: 'Family created succesfully'
      }))
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

let familyGetAll = (req, res, next) => {
  Family.find().exec().then((docs) => {
    console.log(docs)
    res.status(200).send({
      message: 'Here is the list of Familys and their details',
      success: true,
      docs
    })
  }).catch((err) => {
    res.status(500).send(err.message)
  })
}

let familyGetAllParamsid = (req, res, next) => {
  const id = req.params.id
  Family.findById(id).exec().then((docs) => {
    if (docs) {
      res.status(201).send({
        message: 'Here is your details for the requested ID',
        docs
      })
    } else {
      res.status(204).send({
        message: 'Family not found'
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: 'Family not found',
      error: err.name
    })
  })
}

let familyPatchdetailsId = (req, res, next) => {
  const userId = req.params.id
  const updateOps = {}
  if (req.body.validatedOn) {
    req.body.validatedOn = moment(moment(req.body.validatedOn, 'DD/MM/YYYY').toDate()).add(1, 'hours')
  }
  if (req.body.registeredOn) {
    req.body.registeredOn = moment(moment(req.body.registeredOn, 'DD/MM/YYYY').toDate()).add(1, 'hours')
  }
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  Family.update({ _id: userId }, { $set: updateOps })
    .exec()
    .then((docs) => {
      res.status(201).send({
        message: 'Family details are altered succesfully',
        docs
      })
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

export default { familyPost, familyGetAll, familyPatchdetailsId, familyGetAllParamsid }
