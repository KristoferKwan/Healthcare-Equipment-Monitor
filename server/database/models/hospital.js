const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define userSchema
const hospitalSchema = new Schema({
  _id: { type: Number, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  location: {
    longitude: {
      type: Number,
      unique: false,
      required: true 
    },
    latitude: {
      type: Number,
      unique: false,
      required: true
    }
  },
  hospitalInfo: {
    type: Schema.Types.ObjectId,
    ref: 'HospitalInfo'
  },
});

const Hospital = mongoose.model('Hospital', hospitalSchema)
module.exports = Hospital