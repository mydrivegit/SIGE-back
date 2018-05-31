import mongoose from 'mongoose'

let ClassesSchema = new mongoose.Schema({
  code: {
    type: String
  },
  year: String,
  semester: Number,
  label: String,
  level: String,
  status: Boolean,
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  subjectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
},
{
  timestamps: true
})

export default mongoose.model('Classes', ClassesSchema)
