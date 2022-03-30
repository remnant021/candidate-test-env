import Mongoose from "mongoose"

const authSchema = new Mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default Mongoose.model('users', authSchema)

