const helper = require("../util/util");
const express = require("express");
const router = express.Router();
const hospitalHelper = require("../requests/publicHealthDepartments");
//const json = require("../mockdata/hospitalData.json");
var fs = require("fs");
//console.log(json);
//var json = JSON.parse(fs.readFileSync("../mockdata/hospitalData.json", "utf8"));
router.get("/hospitalHelper", async (req, res) => {
  try {
    hospitalHelper.getPublicHealthDepartments(json);
    return res.json({
      status: "success",
      message: "hospital stuff"
    });
  } catch (error) {
    res.status(404);
    return res.json(error);
  }
});

router.post("/makeHospital", (req, res) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const state = req.body.state;
    const county = req.body.county;
    const telephone = req.body.telephone;
    const supplies = req.body.supplies;
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
    return res.json({
      status: "success",
      message: "hospital was made!"
    });
  } catch (error) {
    res.status(404);
    return res.json(error);
  }
});

module.exports = router;
