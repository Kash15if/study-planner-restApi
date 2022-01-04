const express = require("express");
const router = express.Router();

router.get("/alltask", async (req, res) => {
  res.send("alltask");
});

router.get("/onetask:id", async (req, res) => {
  res.send("Hello World");
});

router.get("/predefined", async (req, res) => {
  res.send({});
});

router.get("/archived", async (req, res) => {
  res.send({});
});

module.exports = router;
