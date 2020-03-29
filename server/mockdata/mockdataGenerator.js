const casual = require("casual");

function last7Days(date) {
  //gets last 7 dates and puts them in a array
  d = date;
  var result = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d.getTime());
  }

  return result;
}

const generateHospitalData = repetitions => {
  const startingDate = new Date(1585434292586); //hardcoded  2/38 evening date date in milliseconds
  const last7DaysArray = last7Days(startingDate);
  const ranges = {
    ventilators: casual.integer(100, 200),
    beds: casual.integer(230, 546),
    masks: casual.integer(5000, 10000),
    nprs: casual.integer(40, 80),
    goggles: casual.integer(5000, 10000),
    gowns: casual.integer(5000, 10000),
    gloves: casual.integer(5000, 10000)
  };
  var db = [];
  for (var x = 0; x < repetitions; x++) {
    for (var day = 0; day < 7; day++) {
      var hospital = {};
      hospital.ventilators = casual.integer(
        ranges.ventilators - 30,
        ranges.ventilators + 10
      );
      hospital.beds = casual.integer(ranges.beds - 30, ranges.beds + 20);
      hospital.masks = casual.integer(ranges.masks - 500, ranges.masks + 300);
      hospital.nprs = casual.integer(ranges.nprs - 4, ranges.nprs + 2);
      hospital.goggles = casual.integer(
        ranges.goggles - 500,
        ranges.goggles + 300
      );
      hospital.gowns = casual.integer(ranges.gowns - 500, ranges.gowns + 300);
      hospital.gloves = casual.integer(
        ranges.gloves - 500,
        ranges.gloves + 300
      );

      Object.keys(ranges).map(itemType => {
        if (hospital[itemType] < 0) {
          hospital[itemType] = 0;
        }
        ranges[itemType] = hospital[itemType];
      });
      hospital.timestamp = last7DaysArray[day];

      db.push(hospital);
    }
  }
  return db;
};
db = generateHospitalData(1);
//console.log(db);

module.exports = {
  last7Days: last7Days,
  generateHospitalData: generateHospitalData
};
