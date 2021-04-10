let express = require("express");
let db = require("../models");
let Student = db.Student;

let router = express.Router();

// when accessing the base url/students we'll get the list of all students in json format
router.get("/students", function (req, res, next) {
  Student.findAll().then((students) => {
    return res.json(students);
  });
});

router.post("/students", function (req, res, next) {
  Student.create(req.body).then((data) => {
    return res.status(201).send("Student created!");
  });
});
