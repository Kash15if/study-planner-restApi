const express = require("express");
const app = express();

//importing db-connection query
const pool = require("./models/dbCon");
pool.connect().then((row) => {
  console.log("db is connected :", row._connected);
});

//for cors error
const cors = require("cors");
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

const AllGetROutes = require("./api/getRoutes");
const AllPostRoutes = require("./api/postRoutes");
app.use("/get", AllGetROutes);
app.use("/post", AllPostRoutes);

app.listen(3000);
