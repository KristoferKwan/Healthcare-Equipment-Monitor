const axios = require("axios").default;
//const json = require("../mockdata/hospitalData.json");
const helper = require("../util/util");
const mockDataGenerator = require("../mockdata/mockdataGenerator");

const getPublicHealthDepartments = () => {
  axios
    .get(
      "https://opendata.arcgis.com/datasets/1b919b0ff5f44d05bcb374591206f757_0.geojson"
    )
    .then(function(response) {
      //console.log(response.data.features[0]);
      //console.log("yay");
      //3699
      for (var x = 0; x < 3699; ++x) {
        //const jsonEntry = x * 7;
        const supplies = mockDataGenerator.generateHospitalData(1);
        const id = response.data.features[x].properties.ID;
        const name = response.data.features[x].properties.NAME;
        const longitude = response.data.features[x].properties.X;
        const latitude = response.data.features[x].properties.Y;
        const state = response.data.features[x].properties.STATE;
        const county = response.data.features[x].properties.COUNTY;
        const telephone = response.data.features[x].properties.TELEPHONE;
        helper.makeHospital(
          id,
          name,
          state,
          county,
          longitude,
          latitude,
          supplies,
          telephone
        );
        // axios
        //   .post("https://localhost:8080/api/util/makeHospital", {
        //     body: {
        //       id: response.data.features[x].properties.ID,
        //       name: response.data.features[x].properties.NAME,
        //       longitude: response.data.features[x].properties.X,
        //       latitude: response.data.features[x].properties.Y,
        //       state: response.data.features[x].properties.STATE,
        //       county: response.data.features[x].properties.COUNTY,
        //       telephone: response.data.features[x].properties.TELEPHONE,
        //       supplies: supplies
        //     }
        //   })
        //   .then(function(response) {
        //     console.log(response);
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });
      }
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      console.log("Got real hospital data");
    });
};

module.exports = {
  getPublicHealthDepartments: getPublicHealthDepartments
};
