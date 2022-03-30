import Mongoose from "mongoose"


const servicesSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  descriiption: {
    type: String,
    required: true
  }
}, { timestamps: true })


export default Mongoose.model('services', servicesSchema)

