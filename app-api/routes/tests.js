const express = require("express");

const Test = require("../models/Tests");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
