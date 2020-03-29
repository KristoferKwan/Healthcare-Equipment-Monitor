const express = require('express');
const router = express.Router();
const passport = require('../passport');
const ObjectId = require('mongodb').ObjectID;
const helper = require('../util/util');
const User = require('../database/models/user')

router.post('/signup',(req, res) => {
  console.log('user signup');
  //const { username, password, firstName, lastName, profileImage, email, phoneNumber, roles} = req.body
  console.log(req.body);
  const { username, password } = req.body
  User.findOne({ username: username }, async (err, user) => {
    if (err) {
      console.log('User.js post error: ', err)
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      })
    }
    else {
      const hospitalId = parseInt(req.body.hospitalId)
      const hospital = await helper.getHospital(hospitalId)
      console.log(hospital)
      const newUser = new User({
        username: username,
        password: password,
        hospitalId: parseInt(hospital._id)
      })
      console.log('New User:', newUser);
      newUser.save((err, savedUser) => {
        console.log(err);
        if (err) {
          res.status(404)
          return res.json(err)
        } 
        return res.json(savedUser)
      })
    }
  })
})

router.post(
  '/login',
  function (req, res, next) {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log('logged in', req.user);
    var userInfo = req.user
    console.log("userinfo: ", userInfo);
    res.send(userInfo);
  }
)

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout()
    res.send({ msg: 'logging out' })
  } else {
    res.send({ msg: 'no user to log out' })
  }
})

module.exports = router