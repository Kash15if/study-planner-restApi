const express = require("express");
const router = express.Router();

router.post("/newtask", async (req, res) => {
  res.send("Hello World");
});

router.post("/updatetask", async (req, res) => {
  res.send("Hello World");
});

module.exports = router;
