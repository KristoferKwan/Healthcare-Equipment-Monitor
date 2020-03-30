const helper = require('../util/util')
const express = require('express')
const router = express.Router()
const User = require('../database/models/user')

router.get('/', async (req, res) => {
  try {
    return res.json(await helper.getAllHospitals())
  } catch (error) {
    res.status(404)
    return res.json(error)
  }
})

router.get('/info', async (req, res) => {
  try {
    return res.json(await helper.getAllHospitalsInfo())
  } catch (error) {
    res.status(404)
    return res.json(error)
  }
}) 

router.post('/update/:id', async (req, res) => {
  try {
    await helper.updateSupplies(req.params.id, req.body.supplies)
    return res.json({
      status: "success!!"
    })
  } catch (error) {
    res.status(404)
    return res.json(error)
  }
})


router.get('/:id', async (req, res) => {
  try {
    const hospitalInfo = await helper.getHospitalInfo(req.params.id)
    if(hospitalInfo.name){
      return res.json(hospitalInfo)
    }else {
      throw("err")
    }
  } catch (error) {
    res.status(404)
    return res.json({status:"error"})
  }
})

module.exports = router
