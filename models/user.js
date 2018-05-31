import mongoose from 'mongoose'

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNo: {
    type: Number
  },
  status: {
    type: Boolean,
    default: true
  }
},
{
  timestamps: true
})

export default mongoose.model('User', UserSchema)
