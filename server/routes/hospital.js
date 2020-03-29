const helper = require('../routes/util')
const express = require('express')
const router = express.Router()
const User = require('../database/models/user')

router.get('/', async (req, res) => {
  try {
    return res.json({
      status: 'success',
      message: 'hospital route is currently in progress..'
    })
  } catch (error) {
    res.status(404)
    return res.json(error)
  }
})

router.get('/:id', (req, res) => {
  try {
    
  } catch (error) {

  }
  return res.json({
    state: 'State',
    county: 'County',
    telephone: '000-000-0000',
    supplies: [
      {
        timestamp: new Date().toISOString(),
        ventilators: 0,
        beds: 0,
        masks: 0,
        eyewear: 0,
        gowns: 0,
        nprs: 0
      }
    ]
  })
})

module.exports = router
