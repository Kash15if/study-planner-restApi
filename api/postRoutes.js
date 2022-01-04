const express = require("express");
const router = express.Router();

router.post("/newtask", async (req, res) => {
  const rs = postNewTask();

  res.send(rs);
});

router.post("/updatetask", async (req, res) => {
  res.send("Hello World");
});

module.exports = router;
