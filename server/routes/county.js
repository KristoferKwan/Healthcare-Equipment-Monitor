const helper = require("../util/util");
const express = require("express");
const router = express.Router();

router.post("/makeCounties", async (req,res) => {
  try {
    const result = await helper.getIBMCountyData()
    return res.json({
      status: "success",
      message: "make Counties coming soon..."
    });
  } catch (error) {
    res.status(404);
    return res.json(error);
  }
})

module.exports = router