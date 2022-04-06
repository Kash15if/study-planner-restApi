const express = require("express");
const router = express.Router();

//for multi rows insertion
var format = require("pg-format");

//x.map((y)=>Object.values(y))
// var values = [
//   [7, 'john22', 'john22@gmail.com', '9999999922'],
//   [6, 'testvk', 'testvk@gmail.com', '88888888888']
// ];
// client.query(format('INSERT INTO users (id, name, email, phone) VALUES %L', values),[], (err, result)=>{
//   console.log(err);
//   console.log(result);
// });

//importing db-pool for query
const pool = require("../models/dbCon");

router.post("/newtask", async (req, res) => {
  const data = req.body;
  const taskDets = data.taskDets;
  const subTasks = data.subTasks;

  console.log(taskDets);
  const out = await pool.query(
    'INSERT INTO public."Task"(uid, taskid, task, subject, "desc", deadline, completed, "precentComp") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [
      taskDets.uid,
      taskDets.taskid,
      taskDets.task,
      taskDets.subject,
      taskDets.desc,
      taskDets.deadline,
      taskDets.completed,
      taskDets.precentComp,
    ]
  );

  const out2 = await pool.query(
    format(
      'INSERT INTO public."subtask"(taskid, subtaskid, subtask, "desc", link, completed) VALUES %L',
      subTasks
    ),
    []
  );

  res.send(out);
});

router.post("/updatetask", async (req, res) => {
  const task = req.query.taskDets;
  const subTasks = req.query.subTasks;

  //for task updation
  const out = await pool.query(
    'UPDATE public."Task" SET uid=$1, taskid=$2, task=$3, subject=$4, "desc"=$5, deadline=$6, completed=$7, "precentComp"=$8 WHERE taskid = $2;',
    [uid, taskid, task, subject, desc, deadline, completed, precentComp]
  );

  //for subtask deletion
  // const out2 = await pool.query(
  //   "DELETE FROM public.SubTask where taskid = $1",
  //   [uid]
  // );

  // //for new subtask insertion
  // const out3 = await pool.query(
  //   format(
  //     'INSERT INTO public."Task"(uid, taskid, task, subject, "desc", deadline, completed, "precentComp") VALUES %L',
  //     subTasks
  //   ),
  //   []
  // );

  res.send(out);
});

//delete the task
router.delete("/deltask", async (req, res) => {
  const out1 = await pool.query('DELETE FROM public."Task" where taskid = $1', [
    uid,
  ]);

  const out2 = await pool.query(
    "DELETE FROM public.SubTask where taskid = $1",
    [uid]
  );
});

//routes for Subject
router.post("/newsubject", async (req, res) => {
  const subject = req.body.subject;
  const date = req.body.date;
  const out = await pool.query(
    'INSERT INTO public."subjects"(id, subject, date) VALUES (uuid_generate_v4(), $1, $2)',
    [subject, date]
  );

  res.send(out2);
});

router.post("/updatesubject", async (req, res) => {
  const { subject, date, id } = req.body;

  //for task updation
  const out = await pool.query(
    'UPDATE public."subjects" SET  subject=$1, date= $2 WHERE id = $3;',
    [id, subject, date]
  );

  //for subtask deletion
  const out2 = await pool.query(
    'UPDATE public."Task" SET  subject=$1 WHERE subid = $3;',
    [uid]
  );

  res.send(out2);
});

//delete the task
router.delete("/delsubject", async (req, res) => {
  const { subId } = req.body;
  const out1 = await pool.query('DELETE FROM public."subjects" where id = $1', [
    subId,
  ]);

  const out2 = await pool.query(
    'UPDATE public."Task" SET  subject=null WHERE subid = $1;',

    [subId]
  );
});

//update subtasks

router.post("/updatesubtasks", async (req, res) => {
  const task = req.query.taskDets;
  const subTasks = req.query.subTasks;

  //for subtask deletion
  const out2 = await pool.query(
    "DELETE FROM public.SubTask where taskid = $1",
    [uid]
  );

  //for new subtask insertion
  const out3 = await pool.query(
    format(
      'INSERT INTO public."Task"(uid, taskid, task, subject, "desc", deadline, completed, "precentComp") VALUES %L',
      subTasks
    ),
    []
  );

  res.send(out);
});

module.exports = router;
