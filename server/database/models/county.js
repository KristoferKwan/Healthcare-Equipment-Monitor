const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define userSchema
const countySchema = new Schema({
  name: { type: String, unique: false, required: false },
  countyId: {type: String, unique: true, required: true},
  cases: {type: Number, unique: false, required: true, default: 0},
  hospitals: [{
      type: Schema.Types.ObjectId,
      ref: 'HospitalInfo'
  }],
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
  }
});

const County = mongoose.model('County', countySchema)
module.exports = County