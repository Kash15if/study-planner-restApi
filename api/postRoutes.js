const express = require("express");
const router = express.Router();

//for multi rows insertion
// var format = require('pg-format');

// var values = [
//   [7, 'john22', 'john22@gmail.com', '9999999922'],
//   [6, 'testvk', 'testvk@gmail.com', '88888888888']
// ];
// client.query(format('INSERT INTO users (id, name, email, phone) VALUES %L', values),[], (err, result)=>{
//   console.log(err);
//   console.log(result);
// });

router.post("/newtask", async (req, res) => {
  const out = await pool.query(
    'INSERT INTO public."Task"(uid, taskid, task, subject, "desc", deadline, completed, "precentComp") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    []
  );
  res.send(out);
});

router.post("/updatetask", async (req, res) => {
  const out = await pool.query(
    'UPDATE public."Task" SET uid=$1, taskid=$2, task=$3, subject=$4, "desc"=$5, deadline=$6, completed=$7, "precentComp"=$8 WHERE taskid = $2;',
    [uid, taskid, task, subject, desc, deadline, completed, precentComp]
  );
  res.send(out);
});

module.exports = router;
