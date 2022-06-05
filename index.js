const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//importing db-connection query
const pool = require("./models/dbCon");
pool.connect().then((row) => {
  console.log("db is connected :", row._connected);
});

//for cors error
const cors = require("cors");
const corsOpts = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  // origin: "*",

  // methods: ["GET", "POST"],

  // allowedHeaders: ["Content-Type"],
};

app.use(cors());

const AllGetROutes = require("./api/getRoutes");
const AllPostRoutes = require("./api/postRoutes");
app.use("/get", AllGetROutes);
app.use("/post", AllPostRoutes);

const port = process.env.PORT || 3000;
app.listen(port);
