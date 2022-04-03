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

router.post("/newtask", async (req, res) => {
  const taskDets = req.query.taskDets;
  const subTasks = req.query.subTasks;

  console.log(req.body);
  // const out = await pool.query(
  //   'INSERT INTO public."Task"(uid, taskid, task, subject, "desc", deadline, completed, "precentComp") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
  //   []
  // );

  // const out2 = await pool.query(
  //   format(
  //     'INSERT INTO public."Task"(uid, taskid, task, subject, "desc", deadline, completed, "precentComp") VALUES %L',
  //     subTasks
  //   ),
  //   []
  // );

  // res.send(out2);
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
  const taskDets = req.query.taskDets;
  const subTasks = req.query.subTasks;
  const out = await pool.query(
    'INSERT INTO public."Task"(uid, taskid, task, subject, "desc", deadline, completed, "precentComp") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    []
  );

  const out2 = await pool.query(
    format(
      'INSERT INTO public."Task"(uid, taskid, task, subject, "desc", deadline, completed, "precentComp") VALUES %L',
      subTasks
    ),
    []
  );

  res.send(out2);
});

router.post("/updatesubject", async (req, res) => {
  const task = req.query.taskDets;
  const subTasks = req.query.subTasks;

  //for task updation
  const out = await pool.query(
    'UPDATE public."Task" SET uid=$1, taskid=$2, task=$3, subject=$4, "desc"=$5, deadline=$6, completed=$7, "precentComp"=$8 WHERE taskid = $2;',
    [uid, taskid, task, subject, desc, deadline, completed, precentComp]
  );

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

//delete the task
router.delete("/delsubject", async (req, res) => {
  const out1 = await pool.query('DELETE FROM public."Task" where taskid = $1', [
    uid,
  ]);

  const out2 = await pool.query(
    "DELETE FROM public.SubTask where taskid = $1",
    [uid]
  );
});

//update subtasks

router.post("/updatesubtasks", async (req, res) => {
  const task = req.query.taskDets;
  const subTasks = req.query.subTasks;

  //for task updation
  const out = await pool.query(
    'UPDATE public."Task" SET uid=$1, taskid=$2, task=$3, subject=$4, "desc"=$5, deadline=$6, completed=$7, "precentComp"=$8 WHERE taskid = $2;',
    [uid, taskid, task, subject, desc, deadline, completed, precentComp]
  );

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
