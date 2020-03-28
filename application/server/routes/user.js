const express = require('express');
const router = express.Router();
const passport = require('../passport');
const ObjectId = require('mongodb').ObjectID;

router.post('/', (req, res) => {
  console.log('user signup');

  //const { username, password, firstName, lastName, profileImage, email, phoneNumber, roles} = req.body
  console.log(req.body);
  try {
    return res.json({
      status: "success",
      message: "user route is currently in progress.."
    })
  } catch (error) {
    res.status(404)
    return res.json(error)
  }
  //const { username, password } = req.body
  // ADD VALIDATION
  // User.findOne({ username: username }, (err, user) => {
  //   if (err) {
  //     console.log('User.js post error: ', err)
  //   } else if (user) {
  //     res.json({
  //       error: `Sorry, already a user with the username: ${username}`
  //     })
  //   }
  //   else {
  //     console.log("now adding the user...")
  //     const newUser = new User({
  //       username: username,
  //       password: password,
  //       firstName: firstName,
  //       lastName: lastName,
  //       profileImage: profileImage,

  //     })
  //     console.log('New User:', newUser);
  //     newUser.save((err, savedUser) => {
  //       console.log(err);
  //       if (err) {
  //         res.status(404)
  //         return res.json(err)
  //       } 
  //       return res.json(savedUser)
  //     })
  //   }
  // })
})

module.exports = router