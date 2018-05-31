import mongoose from 'mongoose'

let SubjectSchema = new mongoose.Schema({
  code: {
    type: String
  },
  name: String,
  addedDate: Date,
  status: Boolean
},
{
  timestamps: true
})

export default mongoose.model('Subject', SubjectSchema)
