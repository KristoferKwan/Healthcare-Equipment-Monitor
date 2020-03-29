const Hospital = require('../database/models/hospital')
const HospitalInfo = require('../database/models/hospitalInfo')

const getHospital = async (hospital) => {
  try {
    const hospital = await new Promise((resolve, reject) => {
      Hospital.findOne({ _id: hospital }, (err, res) => {
        if (!res) {
          console.log(err)
          reject('Hospital could not be found')
        } else {
          resolve(res)
        }
      })
    })
    return new Promise(resolve => {
      resolve(hospital)
    })
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
}

const makeHospital = async (id, name, state, county, longitude, latitude, supplies, telephone="") => {
  try {
    await new Promise((resolve, reject) => {
      Hospital.findOne({ _id: id }, (err, res) => {
        if (res) {
          reject('Hospital Already Exists!')
        } else {
          resolve()
        }
      })
    })
    console.log("longitude", longitude)
    console.log("latitude", latitude)
    supplies["timestamp"] = Date.now()
    console.log(supplies)
    hospitalInfo = new HospitalInfo({
      name: name,
      hospitalId: id,
      state: state,
      county: county,
      telephone: telephone,
      supplies: supplies
    })
    console.log(hospitalInfo)
    hospitalInfo.save( (err, savedhospitalInfo) => {
      if (err) {
        console.log(err)
        throw "Invalid Hospital Info"
      } else {
        console.log("successfully saved the hospital")
        console.log(savedhospitalInfo)
        hospital = new Hospital({
          _id: id,
          name: name,
          location: {
            longitude: longitude,
            latitude: latitude
          },
          hospitalInfo: savedhospitalInfo._id
        })
        hospital.save( (err, savedhospital) => {
          if (err) {
            console.log(err)
            throw err
        }})
      }
    })
    return new Promise(resolve => {
      resolve("SUCCESS")
    })
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
}

module.exports = {
  getHospital: getHospital,
  makeHospital: makeHospital
}