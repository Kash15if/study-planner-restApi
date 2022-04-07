const express = require("express");
const router = express.Router();

//importing db-pool for query
const pool = require("../models/dbCon");

router.get("/alltask", async (req, res) => {
  const out = await pool.query(
    'SELECT uid, taskid, task, subject, "desc", deadline, completed, "precentComp", subid, startdate FROM public."Task"',
    []
  );
  res.send(out.rows);
});

router.get("/onetask/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const out = await pool.query(
    'uid, taskid, task, subject, "desc", deadline, completed, "precentComp", subid, startdate FROM public."Task" where taskid = $1;',
    [id]
  );

  const out2 = await pool.query(
    'SELECT  taskid, subtaskid, subtask, "desc", link, completed FROM  public.subtask where taskid = $1;',
    [id]
  );

  res.send({ taskDets: out.rows[0], subTasks: out2.rows });
});

router.get("/predefined", async (req, res) => {
  const out = await pool.query(
    'SELECT uid, taskid, task, subject, "desc", deadline, completed, "precentComp" FROM public.predefinedtask',
    []
  );
  res.send(out.rows);
});

router.get("/archived", async (req, res) => {
  const out = await pool.query(
    'SELECT uid, taskid, task, subject, "desc", deadline, completed, "precentComp" FROM public.archivedtask',
    []
  );
  res.send(out.rows);
});

router.get("/subtask/:taskid", async (req, res) => {
  const id = req.params.taskid;

  const out = await pool.query(
    'SELECT taskid, subtaskid, subtask, "desc", link, completed FROM public.subtask where taskid = $1;',
    [id]
  );
  res.send(out.rows);
});

router.get("/allsubject", async (req, res) => {
  const out = await pool.query(
    "SELECT id, subject, date FROM public.subjects",
    []
  );
  res.send(out.rows);
});

module.exports = router;
