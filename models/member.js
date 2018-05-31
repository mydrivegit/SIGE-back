import mongoose from 'mongoose'

let MemberSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  mobileNo: String,
  telephone: String,
  status: Boolean,
  class: String,
  inCharge: String,
  dob: Date,
  gender: String,
  address: String,
  town: String,
  cp: String,
  roleStudent: {
    type: Boolean,
    default: false
  },
  roleProf: {
    type: Boolean,
    default: false
  },
  role: String,
  page: String,
  familyId: String,
  roleInCharge: {
    type: Boolean,
    default: false
  },
  memberToFamily: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
})

export default mongoose.model('Member', MemberSchema)
