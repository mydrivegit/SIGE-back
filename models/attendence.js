import mongoose from 'mongoose'

let AttendenceSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classes' },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  member: String,
  comment: String,
  dateOfAttendence: Date,
  status: { type: Boolean, default: true }
},
{
  timestamps: true
})

export default mongoose.model('Attendence', AttendenceSchema)
