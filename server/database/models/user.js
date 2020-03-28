const mongoose = require('mongoose')
//const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
  username: { type: String, unique: true, required: false },
  hospitalID: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital'
  },
  password: { type: String, unique: false, required: false },
});

// userSchema.methods = {
//     checkPassword: function (inputPassword) {
//       console.log("checking:", inputPassword);
//     return bcrypt.compareSync(inputPassword, this.password)
//   },
//     hashPassword: plainTextPassword => {
//     return bcrypt.hashSync(plainTextPassword, 10)
//     }
//   }

userSchema.pre('save', function (next) {
  if (!this.password) {
      console.log('models/user.js =======NO PASSWORD PROVIDED=======')
      next()
    } else {
      console.log('models/user.js hashPassword in pre save');
      this.password = this.hashPassword(this.password)
      next()
    }
  })

const User = mongoose.model('User', userSchema)
module.exports = User