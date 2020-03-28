const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define userSchema
const countySchema = new Schema({
  name: { type: String, unique: true, required: false },
  cases: {type: Number, unique: false, required: true, default: 0},
  hospitals: [{
      type: Schema.Types.ObjectId,
      ref: 'HospitalInfo'
  }]
});

const County = mongoose.model('County', countySchema)
module.exports = County