const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define userSchema
const hospitalInfoSchema = new Schema({
  name: { type: String, unique: true, required: false },
  hospitalId: { type: String, unique: true, required: false },
  state: { type: String, unique: false, required: true },
  county: { type: String, unique: false, required: true },
  telephone: { type: String, unique: false, required: false },
  supplies: [{
    timestamp: {
      type: Date,
      default: Date.now(),
      unique: false
    },
    ventilators: {
      type: Number,
      unique: false,
      default: 0,
      min: 0
    },
    beds: {
      type: Number,
      unique: false,
      default: 0,
      min: 0
    },
    masks: {
      type: Number,
      unique: false,
      default: 0,
      min: 0
    },
    goggles: {
      type: Number,
      unique: false,
      default: 0,
      min: 0
    },
    goggles: {
      type: Number,
      unique: false,
      default: 0,
      min: 0
    },
    gowns: {
      type: Number,
      unique: false,
      default: 0,
      min: 0
    },
    nprs: {
      type: Number,
      unique: false,
      default: 0,
      min: 0
    }
  }]
});

const HospitalInfo = mongoose.model('HospitalInfo', hospitalInfoSchema)
module.exports = HospitalInfo