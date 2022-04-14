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

  // console.log(subTasks);
  const out = await pool.query(
    'INSERT INTO public."Task"(uid, taskid, task, subject, "desc", deadline, completed, "precentComp", subid, startdate) VALUES ($1, uuid_generate_v4(), $2, $3, $4, $5, $6, $7, $8, $9) returning taskid',
    [
      taskDets.uid,
      taskDets.task,
      taskDets.subject,
      taskDets.description,
      taskDets.todate,
      taskDets.completed,
      taskDets.precentComp,
      taskDets.subid,
      taskDets.fromdate,
    ]
  );

  const taskidFromDb = out.rows[0].taskid;

  // console.log(out.rows);

  await subTasks.forEach((item) => {
    item = {
      ...item,
      taskid: taskidFromDb,
    };
  });

  const stArray = await subTasks.map((y) => {
    return Object.values({ ...y, taskid: taskidFromDb });
  });

  const out2 = await pool.query(
    format(
      'INSERT INTO public."subtask"(subtaskid , taskid,  subtask, "desc", link, completed) VALUES %L',
      stArray
    ),
    []
  );

  res.send(out);
});

router.post("/updatetask", async (req, res) => {
  const data = req.body;
  const taskDets = data.taskDets;
  const subTasks = data.subTasks;

  const {
    uid,
    taskid,
    task,
    subject,
    desc,
    deadline,
    completed,
    precentComp,
    subid,
    startdate,
  } = taskDets;
  //for task updation
  const out = await pool.query(
    'UPDATE public."Task" SET uid=$1, taskid=$2, task=$3, subject=$4, "desc"=$5, deadline=$6, completed=$7, "precentComp"=$8 , subid=$9, startdate = $10 WHERE taskid = $2;',
    [
      uid,
      taskid,
      task,
      subject,
      desc,
      deadline,
      completed,
      precentComp,
      subid,
      startdate,
    ]
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
  const data = req.body;
  const tid = data.taskDets.taskid;

  const out1 = await pool.query('DELETE FROM public."Task" where taskid = $1', [
    tid,
  ]);

  const out2 = await pool.query(
    "DELETE FROM public.SubTask where taskid = $1",
    [tid]
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

  res.send(out);
});

router.post("/updatesubject", async (req, res) => {
  const { subject, date, id } = req.body;

  //for task updation
  const out = await pool.query(
    'UPDATE public."subjects" SET  subject=$1, date= $2 WHERE id = $3;',
    [subject, date, id]
  );

  // for subtask deletion
  const out2 = await pool.query(
    'UPDATE public."Task" SET  subject=$1 WHERE subid = $2;',
    [subject, id]
  );

  res.send(out);
});

//delete the task
router.post("/delsubject", async (req, res) => {
  const id = req.body.id;

  const out1 = await pool.query('DELETE FROM public."subjects" where id = $1', [
    id,
  ]);

  const out2 = await pool.query(
    'UPDATE public."Task" SET  subject=null WHERE subid = $1;',

    [id]
  );

  res.send(out2);
});

//update subtasks

router.post("/updatesubtasks", async (req, res) => {
  const subject = req.body.subject;
  const date = req.body.date;

  //for subtask deletion
  const out2 = await pool.query(
    "DELETE FROM public.SubTask where taskid = $1",
    [uid]
  );

  //for new subtask insertion
  const out3 = await pool.query(
    format(
      'INSERT INTO public."subtask"(taskid, subtaskid, subtask, "desc", link, completed) VALUES %L',
      subTasks
    ),
    []
  );

  res.send(out3);
});

module.exports = router;
