const Hospital = require('../database/models/hospital')
const HospitalInfo = require('../database/models/hospitalInfo')
const County = require('../database/models/county')
const axios = require('axios')

const getHospital = async (id) => {
  try {
    console.log(id);
    const hospital = await new Promise((resolve, reject) => {
      const h =Hospital.findOne({ _id: id }, (err, res) => {
        if (!res) {
          console.log(err)
          throw('Hospital could not be found')
        }else {
          return res
        }
      })
      resolve(h)
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

const getAllHospitals = async () => {
  try {
    const hospital = await new Promise((resolve, reject) => {
      Hospital.find({}, async (err, hospitals) => {
        if (err) {
          console.log(err)
          throw('Hospitals could not be found')
        }else {
          var hospitalMap = []
          console.log(hospitals)
          await new Promise((resolve) => { 
            hospitals.forEach((hospital) => {
              const hospitalInfo = {
                hospitalId: hospital._id,
                name: hospital.name,
                location: hospital.location      
              }
              hospitalMap.push(hospitalInfo)
              console.log(hospitalMap)
            })
          resolve()
         })
          console.log("here!", hospitalMap)
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

const getHospitalInfo = async (id) => {
  try {
    console.log(id);
    const hospital = await new Promise((resolve, reject) => {
      console.log ("made it in here!")
      const h =HospitalInfo.findOne({ hospitalId: id }, (err, res) => {
        if (!res) {
          console.log(err)
          throw('HospitalInfo could not be found')
        }else {
          console.log(res)
          return res
        }
      })
      resolve(h)
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
}
 

const getIBMCountyData = async () => {
  const dataId = "iB7A1F6ED41154125B004AE3E3E276E3B";
  const countyColId = "id_891958676"; // Not sure if this is needed
  const confirmedColId = "id_1535107331";
  const tableId = "Query1_0_1";
  const resultLimit = 3000;

  const ibmConfig = {
    baseURL: "https://accelerator.weather.com/bi",
    timeout: 1000,
    withCredentials: true // Get XSRF Tokens from Cookies
  };
  const instance = axios.create(ibmConfig);
  // IBM's query format...
  const queryObj = {
    version: 1,
    dataItems: [
      {
        id: countyColId,
        itemId: tableId + ".County",
        selection: [
          {
            operation: "order",
            sort: {
              type: "asc",
              priority: 1
            }
          }
        ]
      },
      {
        id: confirmedColId,
        itemId: tableId + ".Confirmed",
        aggregate: "sum"
      }
    ],
    projections: [
        countyColId,
        confirmedColId
    ],
    limit: resultLimit,
    queryHints: {
      preferredModelItems: [
        "Query1_0_1.State_",
        "Query1_0_1.County",
        "Query1_0_1.Confirmed",
        "Query1_0_1.Lat",
        "Query1_0_1.Long",
        "Query1_0_1.Date_",
        "Query1_0_1.Country"
      ],
      dataCacheExpiry: "0",
      metadataSubsetIDs: [
        "Query1_0_2.Country_Region",
        "Query1_0_3.Confirmed",
        "Query1_0_3.Confirmed_Cases",
        "Query1_0_2.Country_Region_Sovereignty",
        "Statistics_DS_Status_1.Total_",
        "Statistics_DS_Status_1.Lat",
        "Statistics_DS_Status_1.Long",
        "Query1_0_2.Region_Cleaned",
        "Statistics_DS_Status_1.Province_State_1",
        "Query1_0.Confirmed_Cases",
        "Query1_0.Death_Cases",
        "Statistics_DS_Status.Total_",
        "Statistics_DS_Status.Date_",
        "Query1_0_3_1.Confirmed",
        "Query1_0_3_1.Confirmed_Cases",
        "Query1_0_3_1.Deaths",
        "Query1_0_3_1.Death_Cases",
        "Query1_0_3_1.i_Deaths",
        "Query1_0.Date_",
        "Query1_0.Deaths",
        "Query1_0.Confirmed",
        "Statistics_DS_Filtered.Confirmed",
        "Statistics_DS_Filtered.Days_Since_Country_First_Infection",
        "Query1_0_1.State_",
        "Query1_0_1.County",
        "Query1_0_1.Confirmed",
        "Query1_0_1.Lat",
        "Query1_0_1.Long",
        "Query1_0_1.Date_",
        "Query1_0_3_1.Date_",
        "Statistics_DS_Status_1.Date_",
        "Query1_0_1.Country"
      ]
    },
    filters: [ // Likely due to lack of data before this time
      {
        type: "pre",
        expression: {
          operator: "in",
          itemId: "Query1_0_1.Date_",
          values: [
            "Query1_0_1.Date_->[2020-03-28]"
          ]
        }
      }
    ]
  };

  try {
    await instance.get("/", { // Get cookies
      params: {
        perspective: "dashboard",
        pathRef: ".public_folders%2FCOVID19%2FDashboards%2FDS%2FCOVID-19%2B%2528Coronavirus%2529%2BGlobal%2BStatistics",
        id: "iC2B38B09B142481EB83935F6419CA837"
      }
    });
    console.log("Received XSRF Token.");
    const data = await instance.get("/v1/datasets/" + dataId + "/data", {
      params: {
        type: "module",
        refreshmd: "false",
        qfb: "none",
        querySpec: encodeURIComponent(JSON.stringify(queryObj))
      }
    });
  } catch(error) {
    return new Promise((_, reject) => reject(error))
  }

  /*Write your code to query for the IBM county data here */
  //call makeCounties to create the county objects
  console.log("coming soon!");
}


module.exports = {
  makeCounties: makeCounties,
  getIBMCountyData: getIBMCountyData,
  getHospital: getHospital,
  getAllHospitals: getAllHospitals,
  getHospitalInfo: getHospitalInfo,
  makeHospital: makeHospital
}