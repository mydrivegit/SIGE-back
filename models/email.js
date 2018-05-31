import mongoose from 'mongoose'

let EmailSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  emails: String,
  senderId: String,
  sendTime: Date
},
{
  timestamps: true
})

export default mongoose.model('Email', EmailSchema)
