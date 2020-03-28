const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define userSchema
const hospitalSchema = new Schema({
  name: { type: String, unique: true, required: false },
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