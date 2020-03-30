const Hospital = require("../database/models/hospital");
const HospitalInfo = require("../database/models/hospitalInfo");
const County = require("../database/models/county");

const getHospital = async id => {
  try {
    console.log(id);
    const hospital = await new Promise((resolve, reject) => {
      const h = Hospital.findOne({ _id: id }, (err, res) => {
        if (!res) {
          console.log(err);
          throw "Hospital could not be found";
        } else {
          return res;
        }
      });
      resolve(h);
    });
    return new Promise(resolve => {
      resolve(hospital);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

const getAllHospitals = async () => {
  try {
    const hospital = await new Promise((resolve, reject) => {
      Hospital.find({}, async (err, hospitals) => {
        if (err) {
          console.log(err);
          throw "Hospitals could not be found";
        } else {
          var hospitalMap = [];
          await new Promise(resolve => {
            hospitals.forEach(hospital => {
              const hospitalInfo = {
                hospitalId: hospital._id,
                name: hospital.name,
                location: hospital.location
              };
              hospitalMap.push(hospitalInfo);
            });
            resolve();
          });
          resolve(hospitalMap);
        }
      });
    });
    return new Promise(resolve => {
      resolve(hospital);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

const getHospitalInfo = async id => {
  try {
    console.log(id);
    const hospital = await new Promise((resolve, reject) => {
      console.log("made it in here!");
      const h = HospitalInfo.findOne({ hospitalId: id }, (err, res) => {
        if (!res) {
          console.log(err);
          throw "HospitalInfo could not be found";
        } else {
          console.log(res);
          return res;
        }
      });
      resolve(h);
    });
    return new Promise(resolve => {
      resolve(hospital);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

const getAllHospitalsInfo = async () => {
  try {
    const hospital = await new Promise((resolve, reject) => {
      HospitalInfo.find({}, async (err, hospitals) => {
        if (err) {
          console.log(err)
          throw('Hospitals could not be found')
        }else {
          var hospitalMap = []
          await new Promise((resolve) => { 
            hospitals.forEach((hospital) => {
              const hospitalInfo = {
                hospitalId: hospital.hospitalId,
                name: hospital.name,
                state: hospital.state,
                county: hospital.county,
                telephone: hospital.telephone,
                supplies: hospital.supplies
              }
              hospitalMap.push(hospitalInfo)
            })
          resolve()
         })
          resolve(hospitalMap)
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

const updateSupplies = async(id, supplies) => {
  try{
    if(!supplies.timestamp){
      supplies["timestamp"] = Date.now()
    }
    HospitalInfo.findOneAndUpdate({ hospitalId: id }, {$addToSet: {supplies: supplies}}, {new: true}, (err, doc) => {
      if (err) {
        console.log(err)
        throw("hospitalinfo not updated")
      } else {
      }
    })
    return new Promise((resolve, reject) => {
      resolve("sucessfully updated!")
    })
  } catch(error) {
    console.log(error)
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
          reject("Hospital Already Exists!");
        } else {
          resolve();
        }
      });
    });
    console.log("longitude", longitude);
    console.log("latitude", latitude);
    supplies["timestamp"] = Date.now();
    console.log(supplies);
    hospitalInfo = new HospitalInfo({
      name: name,
      hospitalId: id,
      state: state,
      county: county,
      telephone: telephone,
      supplies: supplies
    });
    console.log(hospitalInfo);
    hospitalInfo.save((err, savedhospitalInfo) => {
      if (err) {
        console.log(err);
        throw "Invalid Hospital Info";
      } else {
        console.log("successfully saved the hospital");
        console.log(savedhospitalInfo);
        hospital = new Hospital({
          _id: id,
          name: name,
          location: {
            longitude: longitude,
            latitude: latitude
          },
          hospitalInfo: savedhospitalInfo._id
        });
        hospital.save((err, savedhospital) => {
          if (err) {
            console.log(err);
            throw err;
          }
        });
      }
    });
    return new Promise(resolve => {
      resolve("SUCCESS");
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

const makeCounties = async (name, location, cases) => {
  /* Write your code to make your county object and push to mongodb here (follow the makeHospital function for a guideline)
    Schema (for reference): 
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
  
  */
  console.log("coming soon!");
};

const getIBMCountyData = async () => {
  /*Write your code to query for the IBM county data here */
  //call makeCounties to create the county objects
  console.log("coming soon!");
};

module.exports = {
  makeCounties: makeCounties,
  getIBMCountyData: getIBMCountyData,
  getHospital: getHospital,
  getAllHospitals: getAllHospitals,
  getAllHospitalsInfo: getAllHospitalsInfo,
  getHospitalInfo: getHospitalInfo,
  makeHospital: makeHospital,
  updateSupplies: updateSupplies
};
