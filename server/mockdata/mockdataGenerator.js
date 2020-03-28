const casual = require("casual");
const currentDate = new Date(1585434292586); //hardcoded  2/38 evening date date in milliseconds
function Last7Days(date) {
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
last7days = Last7Days();

var db = [];
for (var id = 0; id < 3699; id++) {
  for (var day = 0; day < 7; day++) {
    var hospital = {};
    hospital.id = id;
    hospital.ventilators = casual.integer(0, 200);
    hospital.beds = casual.integer(0, 546);
    hospital.masks = casual.integer(0, 10000);
    hospital.nprs = casual.integer(0, 80);
    hospital.goggles = casual.integer(0, 10000);
    hospital.gowns = casual.integer(0, 10000);
    hospital.gloves = casual.integer(0, 10000);

    hospital.timestamp = last7days[day];
    db.push(hospital);
  }
}
console.log(JSON.stringify(db));
