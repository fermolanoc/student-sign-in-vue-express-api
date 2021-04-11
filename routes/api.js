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

// define url route to create a new student
router.post("/students", function (req, res, next) {
  Student.create(req.body).then((data) => {
    return res.status(201).send("Student created!");
  });
});

// edit a student - get personalize url based on student id to be edited
router.patch("/students/:id", function (req, res, next) {
  let studentID = req.params.id; // get student id
  let updatedStudent = req.body; // get updated data
  // update the student data only on record that match student id
  // because of DB settings, only one record should match since starID is unique
  Student.update(updatedStudent, { where: { id: studentID } }).then(() => {
    return res.send("Ok");
  });
});

// delete student

module.exports = router;
