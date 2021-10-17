const express = require("express");
const router = express.Router();

router.get("/alltask", async (req, res) => {
  res.send("Hello World");
});

router.get("/onetask:id", async (req, res) => {
  res.send("Hello World");
});

router.get("/predefined", async (req, res) => {
  res.send("Hello World");
});

router.get("/archived", async (req, res) => {
  res.send("Hello World");
});

module.exports = router;
