const Hospital = require("../database/models/hospital");
const HospitalInfo = require("../database/models/hospitalInfo");
const County = require("../database/models/county");
const axios = require('axios');

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

const makeCounties = async (id, name, location, cases) => {
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
  try {
    await new Promise((resolve, reject) => {
      County.findOne({ countyId: id }, (err, res) => {
        if (res) {
          reject("County Already Exists!");
        } else {
          resolve();
        }
      });
    });
    const county = new County({
      name: name,
      countyId: id,
      cases: cases,
      location: {
        longitude: location.lng,
        latitude: location.lat
      }
    });
    county.save((err, savedInfo) => {
      if(err) {
        console.log(err);
        throw "Invalid County Info";
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

const getIBMCountyData = async () => {
  const dataId = "iB7A1F6ED41154125B004AE3E3E276E3B";
  // const countyColId = "id_891958676"; // Not sure if this is needed
  // const confirmedColId = "id_1535107331";
  // const tableId = "Query1_0_1";
  // const resultLimit = 3000;

  // https://accelerator.weather.com/bi/v1/datasets/iB7A1F6ED41154125B004AE3E3E276E3B/data?type=module&refreshmd=false&qfb=none&querySpec=%7B%22version%22%3A%221%22%2C%22dataItems%22%3A%5B%7B%22id%22%3A%22id_999552067%22%2C%22itemId%22%3A%22Query1_0_1.Lat%22%7D%2C%7B%22id%22%3A%22id_921329634%22%2C%22itemId%22%3A%22Query1_0_1.Long%22%7D%2C%7B%22id%22%3A%22id_1449760063%22%2C%22itemId%22%3A%22Query1_0_1.State_%22%7D%2C%7B%22id%22%3A%22id284255333%22%2C%22itemId%22%3A%22Query1_0_1.County%22%7D%2C%7B%22id%22%3A%22latlongLocations.caption%22%2C%22nest%22%3A%5B%22id_1449760063%22%2C%22id284255333%22%5D%7D%2C%7B%22id%22%3A%22id1030134541%22%2C%22itemId%22%3A%22Query1_0_1.Confirmed%22%2C%22aggregate%22%3A%22sum%22%7D%2C%7B%22id%22%3A%22id_1600758246%22%2C%22itemId%22%3A%22Query1_0_1.Confirmed%22%2C%22aggregate%22%3A%22sum%22%7D%5D%2C%22projections%22%3A%5B%22id_999552067%22%2C%22id_921329634%22%2C%22latlongLocations.caption%22%2C%22id1030134541%22%2C%22id_1600758246%22%5D%2C%22limit%22%3A30000%2C%22queryHints%22%3A%7B%22preferredModelItems%22%3A%5B%22Query1_0_1.Date_%22%2C%22Query1_0_1.Confirmed%22%2C%22Query1_0_1.Country%22%2C%22Query1_0_1.County%22%2C%22Query1_0_1.State_%22%5D%2C%22dataCacheExpiry%22%3A%223600%22%2C%22metadataSubsetIDs%22%3A%5B%22Query1_0_2.Country_Region%22%2C%22Query1_0_3.Confirmed%22%2C%22Query1_0_3.Confirmed_Cases%22%2C%22Query1_0_2.Country_Region_Sovereignty%22%2C%22Statistics_DS_Status_1.Total_%22%2C%22Statistics_DS_Status_1.Lat%22%2C%22Statistics_DS_Status_1.Long%22%2C%22Query1_0_2.Region_Cleaned%22%2C%22Statistics_DS_Status_1.Province_State_1%22%2C%22Query1_0.Confirmed_Cases%22%2C%22Query1_0.Death_Cases%22%2C%22Statistics_DS_Status.Total_%22%2C%22Statistics_DS_Status.Date_%22%2C%22Query1_0_3_1.Confirmed%22%2C%22Query1_0_3_1.Confirmed_Cases%22%2C%22Query1_0_3_1.Deaths%22%2C%22Query1_0_3_1.Death_Cases%22%2C%22Query1_0_3_1.i_Deaths%22%2C%22Query1_0.Date_%22%2C%22Query1_0.Deaths%22%2C%22Query1_0.Confirmed%22%2C%22Statistics_DS_Filtered.Confirmed%22%2C%22Statistics_DS_Filtered.Days_Since_Country_First_Infection%22%2C%22Query1_0_1.State_%22%2C%22Query1_0_1.County%22%2C%22Query1_0_1.Confirmed%22%2C%22Query1_0_1.Lat%22%2C%22Query1_0_1.Long%22%2C%22Query1_0_1.Date_%22%2C%22Query1_0_3_1.Date_%22%2C%22Statistics_DS_Status_1.Date_%22%2C%22Query1_0_1.Country%22%5D%7D%2C%22filters%22%3A%5B%7B%22type%22%3A%22pre%22%2C%22expression%22%3A%7B%22operator%22%3A%22in%22%2C%22itemId%22%3A%22Query1_0_1.Date_%22%2C%22values%22%3A%5B%22Query1_0_1.Date_-%3E%5B2020-03-29%5D%22%5D%7D%7D%5D%7D

  const total_data = "%7B%22version%22%3A%221%22%2C%22dataItems%22%3A%5B%7B%22id%22%3A%22id_999552067%22%2C%22itemId%22%3A%22Query1_0_1.Lat%22%7D%2C%7B%22id%22%3A%22id_921329634%22%2C%22itemId%22%3A%22Query1_0_1.Long%22%7D%2C%7B%22id%22%3A%22id_1449760063%22%2C%22itemId%22%3A%22Query1_0_1.State_%22%7D%2C%7B%22id%22%3A%22id284255333%22%2C%22itemId%22%3A%22Query1_0_1.County%22%7D%2C%7B%22id%22%3A%22latlongLocations.caption%22%2C%22nest%22%3A%5B%22id_1449760063%22%2C%22id284255333%22%5D%7D%2C%7B%22id%22%3A%22id1030134541%22%2C%22itemId%22%3A%22Query1_0_1.Confirmed%22%2C%22aggregate%22%3A%22sum%22%7D%2C%7B%22id%22%3A%22id_1600758246%22%2C%22itemId%22%3A%22Query1_0_1.Confirmed%22%2C%22aggregate%22%3A%22sum%22%7D%5D%2C%22projections%22%3A%5B%22id_999552067%22%2C%22id_921329634%22%2C%22latlongLocations.caption%22%2C%22id1030134541%22%2C%22id_1600758246%22%5D%2C%22limit%22%3A30000%2C%22queryHints%22%3A%7B%22preferredModelItems%22%3A%5B%22Query1_0_1.Date_%22%2C%22Query1_0_1.Confirmed%22%2C%22Query1_0_1.Country%22%2C%22Query1_0_1.County%22%2C%22Query1_0_1.State_%22%5D%2C%22dataCacheExpiry%22%3A%223600%22%2C%22metadataSubsetIDs%22%3A%5B%22Query1_0_2.Country_Region%22%2C%22Query1_0_3.Confirmed%22%2C%22Query1_0_3.Confirmed_Cases%22%2C%22Query1_0_2.Country_Region_Sovereignty%22%2C%22Statistics_DS_Status_1.Total_%22%2C%22Statistics_DS_Status_1.Lat%22%2C%22Statistics_DS_Status_1.Long%22%2C%22Query1_0_2.Region_Cleaned%22%2C%22Statistics_DS_Status_1.Province_State_1%22%2C%22Query1_0.Confirmed_Cases%22%2C%22Query1_0.Death_Cases%22%2C%22Statistics_DS_Status.Total_%22%2C%22Statistics_DS_Status.Date_%22%2C%22Query1_0_3_1.Confirmed%22%2C%22Query1_0_3_1.Confirmed_Cases%22%2C%22Query1_0_3_1.Deaths%22%2C%22Query1_0_3_1.Death_Cases%22%2C%22Query1_0_3_1.i_Deaths%22%2C%22Query1_0.Date_%22%2C%22Query1_0.Deaths%22%2C%22Query1_0.Confirmed%22%2C%22Statistics_DS_Filtered.Confirmed%22%2C%22Statistics_DS_Filtered.Days_Since_Country_First_Infection%22%2C%22Query1_0_1.State_%22%2C%22Query1_0_1.County%22%2C%22Query1_0_1.Confirmed%22%2C%22Query1_0_1.Lat%22%2C%22Query1_0_1.Long%22%2C%22Query1_0_1.Date_%22%2C%22Query1_0_3_1.Date_%22%2C%22Statistics_DS_Status_1.Date_%22%2C%22Query1_0_1.Country%22%5D%7D%2C%22filters%22%3A%5B%7B%22type%22%3A%22pre%22%2C%22expression%22%3A%7B%22operator%22%3A%22in%22%2C%22itemId%22%3A%22Query1_0_1.Date_%22%2C%22values%22%3A%5B%22Query1_0_1.Date_-%3E%5B2020-03-29%5D%22%5D%7D%7D%5D%7D";
  // Latitude, Longitude, (County, State), Confirmed, Confirmed (again??)

  // const county_state_confirmed = "%7B%22version%22%3A%221%22%2C%22dataItems%22%3A%5B%7B%22id%22%3A%22id_891958676%22%2C%22itemId%22%3A%22Query1_0_1.County%22%2C%22selection%22%3A%5B%7B%22operation%22%3A%22order%22%2C%22sort%22%3A%7B%22type%22%3A%22asc%22%2C%22priority%22%3A1%7D%7D%5D%7D%2C%7B%22id%22%3A%22id_429865200%22%2C%22itemId%22%3A%22Query1_0_1.State_%22%2C%22selection%22%3A%5B%7B%22operation%22%3A%22order%22%2C%22sort%22%3A%7B%22type%22%3A%22asc%22%2C%22priority%22%3A2%7D%7D%5D%7D%2C%7B%22id%22%3A%22id_1535107331%22%2C%22itemId%22%3A%22Query1_0_1.Confirmed%22%2C%22aggregate%22%3A%22sum%22%2C%22selection%22%3A%5B%7B%22operation%22%3A%22order%22%2C%22sort%22%3A%7B%22type%22%3A%22desc%22%2C%22by%22%3A%22caption%22%2C%22priority%22%3A0%7D%7D%5D%7D%5D%2C%22projections%22%3A%5B%22id_891958676%22%2C%22id_429865200%22%2C%22id_1535107331%22%5D%2C%22limit%22%3A10000%2C%22queryHints%22%3A%7B%22preferredModelItems%22%3A%5B%22Query1_0_1.State_%22%2C%22Query1_0_1.County%22%2C%22Query1_0_1.Confirmed%22%2C%22Query1_0_1.Lat%22%2C%22Query1_0_1.Long%22%2C%22Query1_0_1.Date_%22%2C%22Query1_0_1.Country%22%5D%2C%22dataCacheExpiry%22%3A%223600%22%2C%22metadataSubsetIDs%22%3A%5B%22Query1_0_2.Country_Region%22%2C%22Query1_0_3.Confirmed%22%2C%22Query1_0_3.Confirmed_Cases%22%2C%22Query1_0_2.Country_Region_Sovereignty%22%2C%22Statistics_DS_Status_1.Total_%22%2C%22Statistics_DS_Status_1.Lat%22%2C%22Statistics_DS_Status_1.Long%22%2C%22Query1_0_2.Region_Cleaned%22%2C%22Statistics_DS_Status_1.Province_State_1%22%2C%22Query1_0.Confirmed_Cases%22%2C%22Query1_0.Death_Cases%22%2C%22Statistics_DS_Status.Total_%22%2C%22Statistics_DS_Status.Date_%22%2C%22Query1_0_3_1.Confirmed%22%2C%22Query1_0_3_1.Confirmed_Cases%22%2C%22Query1_0_3_1.Deaths%22%2C%22Query1_0_3_1.Death_Cases%22%2C%22Query1_0_3_1.i_Deaths%22%2C%22Query1_0.Date_%22%2C%22Query1_0.Deaths%22%2C%22Query1_0.Confirmed%22%2C%22Statistics_DS_Filtered.Confirmed%22%2C%22Statistics_DS_Filtered.Days_Since_Country_First_Infection%22%2C%22Query1_0_1.State_%22%2C%22Query1_0_1.County%22%2C%22Query1_0_1.Confirmed%22%2C%22Query1_0_1.Lat%22%2C%22Query1_0_1.Long%22%2C%22Query1_0_1.Date_%22%2C%22Query1_0_3_1.Date_%22%2C%22Statistics_DS_Status_1.Date_%22%2C%22Query1_0_1.Country%22%5D%7D%2C%22filters%22%3A%5B%7B%22type%22%3A%22pre%22%2C%22expression%22%3A%7B%22operator%22%3A%22in%22%2C%22itemId%22%3A%22Query1_0_1.Date_%22%2C%22values%22%3A%5B%22Query1_0_1.Date_-%3E%5B2020-03-29%5D%22%5D%7D%7D%5D%7D"
  // const county_history = "%7B%22version%22%3A%221%22%2C%22dataItems%22%3A%5B%7B%22id%22%3A%22id1495752975%22%2C%22itemId%22%3A%22Query1_0_1.Date_%22%2C%22selection%22%3A%5B%7B%22operation%22%3A%22order%22%2C%22sort%22%3A%7B%22type%22%3A%22desc%22%2C%22by%22%3A%22caption%22%2C%22priority%22%3A0%7D%7D%5D%7D%5D%2C%22projections%22%3A%5B%22id1495752975%22%5D%2C%22limit%22%3A3000%2C%22queryHints%22%3A%7B%22preferredModelItems%22%3A%5B%22Query1_0_1.State_%22%2C%22Query1_0_1.County%22%2C%22Query1_0_1.Confirmed%22%2C%22Query1_0_1.Lat%22%2C%22Query1_0_1.Long%22%2C%22Query1_0_1.Date_%22%2C%22Query1_0_1.Country%22%5D%2C%22dataCacheExpiry%22%3A%223600%22%2C%22metadataSubsetIDs%22%3A%5B%22Query1_0_2.Country_Region%22%2C%22Query1_0_3.Confirmed%22%2C%22Query1_0_3.Confirmed_Cases%22%2C%22Query1_0_2.Country_Region_Sovereignty%22%2C%22Statistics_DS_Status_1.Total_%22%2C%22Statistics_DS_Status_1.Lat%22%2C%22Statistics_DS_Status_1.Long%22%2C%22Query1_0_2.Region_Cleaned%22%2C%22Statistics_DS_Status_1.Province_State_1%22%2C%22Query1_0.Confirmed_Cases%22%2C%22Query1_0.Death_Cases%22%2C%22Statistics_DS_Status.Total_%22%2C%22Statistics_DS_Status.Date_%22%2C%22Query1_0_3_1.Confirmed%22%2C%22Query1_0_3_1.Confirmed_Cases%22%2C%22Query1_0_3_1.Deaths%22%2C%22Query1_0_3_1.Death_Cases%22%2C%22Query1_0_3_1.i_Deaths%22%2C%22Query1_0.Date_%22%2C%22Query1_0.Deaths%22%2C%22Query1_0.Confirmed%22%2C%22Statistics_DS_Filtered.Confirmed%22%2C%22Statistics_DS_Filtered.Days_Since_Country_First_Infection%22%2C%22Query1_0_1.State_%22%2C%22Query1_0_1.County%22%2C%22Query1_0_1.Confirmed%22%2C%22Query1_0_1.Lat%22%2C%22Query1_0_1.Long%22%2C%22Query1_0_1.Date_%22%2C%22Query1_0_3_1.Date_%22%2C%22Statistics_DS_Status_1.Date_%22%2C%22Query1_0_1.Country%22%5D%7D%2C%22filters%22%3A%5B%7B%22type%22%3A%22pre%22%2C%22expression%22%3A%7B%22operator%22%3A%22in%22%2C%22itemId%22%3A%22Query1_0_1.County%22%2C%22values%22%3A%5B%22Query1_0_1.County-%3E%5B";
  // // Queens%20County
  // const county_history_tail = "%5D%22%5D%7D%7D%5D%7D";

  const ibmConfig = {
    baseURL: "https://accelerator.weather.com/bi",
    timeout: 8000,
  };
  const instance = axios.create(ibmConfig);

  try {
    const initial = await instance.get("/", { // Get cookies
      params: {
        perspective: "dashboard",
        pathRef: ".public_folders%2FCOVID19%2FDashboards%2FDS%2FCOVID-19%2B%2528Coronavirus%2529%2BGlobal%2BStatistics",
        id: "iC2B38B09B142481EB83935F6419CA837"
      }
    });
    console.log("Received XSRF Token.");
    let xsrf = "";
    initial.headers["set-cookie"].forEach(cookie => {
      const match = cookie.match(/XSRF-TOKEN=([^;]*)/);
      if(match !== null) {
        xsrf = match[1];
      }
    });

    // Latitude, Longitude, (County, State), Confirmed, Confirmed (again??)
    const cases = await instance.get("https://accelerator.weather.com/bi/v1/datasets/iB7A1F6ED41154125B004AE3E3E276E3B/data?type=module&refreshmd=false&qfb=none&querySpec=" + total_data, {
      headers: {
        "Host": "accelerator.weather.com",
        "x-xsrf-token": xsrf,
        "Cookie": "XSRF-TOKEN=" + xsrf + ";"
      }
    });

    const index_values = cases.data.dataItems;
    const data = cases.data.data;

    const latitudes = index_values[0].items;
    const longitudes = index_values[1].items;
    const stateCounty = index_values[2].items;

    const makeCountyFromData = (dataEntry) => {
      const pt = dataEntry.pt;
      const countyName = stateCounty[pt[2]].t[1].d;
      const countyId = stateCounty[pt[2]].t[0].d + countyName;
      const lat = latitudes[pt[0]].t[0].u;
      const lng = longitudes[pt[1]].t[0].u;
      const cases = pt[3].v;

      makeCounties(countyId, countyName, {lat, lng}, cases);
    };
    data.forEach(entry => makeCountyFromData(entry));

  } catch(error) {
    console.log(error);
    return new Promise((_, reject) => reject(error))
  }

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
  makeHospital: makeHospital
};
