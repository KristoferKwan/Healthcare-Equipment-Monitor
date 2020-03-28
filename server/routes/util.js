const helper = require('../routes/util')
const express = require('express')
const router = express.Router()
const User = require('../database/models/user')

router.get('/mockdata', async (req, res) => {
  try {
    return res.json({
      status: "success",
      message: "mockdata route is currently in progress.."
    })
  } catch (error) {
    res.status(404)
    return res.json(error)
  }
})

module.exports = router