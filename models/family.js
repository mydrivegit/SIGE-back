import mongoose from 'mongoose'

let FamilySchema = new mongoose.Schema({
  title: String,
  inCharge: String,
  registeredOn: Date,
  year: String,
  type: String,
  status: String,
  validatedOn: Date,
  code: String,
  comments: String
},
{
  timestamps: true
})

export default mongoose.model('Family', FamilySchema)
