const axios = require("axios").default;
console.log("http://localhost:8080/utils");
const json = require("../mockdata/hospitalData.json");
console.log(json[0]);
axios
  .get(
    "https://opendata.arcgis.com/datasets/1b919b0ff5f44d05bcb374591206f757_0.geojson"
  )
  .then(function(response) {
    // handle success
    console.log(response.data.features.length * 7);
    console.log(json.length);
    console.log(response.data.features[0]);
    for (var x = 0; x < response.data.features.length; ++x) {
      const jsonEntry = x * 7;
      axios.post("http://localhost:8080/utils/makeHospital", {
        body: {
          id: json[jsonEntry].id,
          name: response.data.features[x].properties.NAME,
          longitude: response.data.features[x].properties.X,
          latitude: response.data.features[x].properties.Y,
          state: response.data.features[x].properties.STATE,
          county: response.data.features[x].properties.COUNTY,
          telephone: response.data.features[x].properties.TELEPHONE,
          supplies: {
            timestamp: new Date(json[jsonEntry].timestamp),
            ventilators: json[jsonEntry].ventilators,
            beds: json[jsonEntry].beds,
            goggles: json[jsonEntry].goggles,
            gowns: json[jsonEntry].gowns,
            masks: json[jsonEntry].masks,
            nprs: json[jsonEntry].nprs,
            gloves: json[jsonEntry].gloves
          }
        }
      });
    }
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .then(function() {
    console.log("I tried");
  });
