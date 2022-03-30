import Mongoose from "mongoose"


const bookingSchema = new Mongoose.Schema({
  service_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },

}, { timestamps: true })


export default Mongoose.model('bookings', bookingSchema)

