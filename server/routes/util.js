const helper = require("../util/util");
const express = require("express");
const router = express.Router();

router.get("/mockdata", async (req, res) => {
  try {
    return res.json({
      status: "success",
      message: "mockdata route is currently in progress.."
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
