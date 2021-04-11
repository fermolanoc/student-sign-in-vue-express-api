let express = require("express");
let db = require("../models");
let Student = db.Student;

let router = express.Router();

// when accessing the base url/students we'll get the list of all students in json format
router.get("/students", function (req, res, next) {
  // sort the students, first by present status (not present first) then by name regardless of case
  Student.findAll({
    order: ["present", db.Sequelize.fn("lower", db.Sequelize.col("name"))],
  })
    .then((students) => {
      return res.json(students);
    })
    // if no students data is shown, catch and handle error
    .catch((err) => next(err));
});

// define url route to create a new student
router.post("/students", function (req, res, next) {
  Student.create(req.body)
    .then((data) => {
      return res.status(201).send("Student created!");
    })
    .catch((err) => {
      // handle user errors
      if (err instanceof db.Sequelize.ValidationError) {
        // respond with 404 + error message
        let messages = err.errors.map((e) => e.message);
        return res.status(400).json(messages);
      }

      // otherwise, handle other errors, such as server errors
      return next(err);
    });
});

// edit a student - get personalize url based on student id to be edited
router.patch("/students/:id", function (req, res, next) {
  let studentID = req.params.id; // get student id
  let updatedStudent = req.body; // get updated data
  // update the student data only on record that match student id
  // because of DB settings, only one record should match since starID is unique
  Student.update(updatedStudent, { where: { id: studentID } })
    .then((rowsModified) => {
      // check number of rows changed
      let numberOfRowsModified = rowsModified[0];
      if (numberOfRowsModified == 1) {
        return res.send("Ok");
      } else {
        // if student doesn't exists or no rows
        return res
          .status(404)
          .json(`Student with id ${studentID} was not found`);
      }
    })
    .catch((err) => {
      // if validation error, it's a bad request: ex: modify student to have no name or a duplicate starID
      if (err instanceof db.Sequelize.ValidationError) {
        let messages = err.errors.map((e) => e.message);
        return res.status(400).json(messages);
      } else {
        // unexpected errors
        return next(err);
      }
    });
});

// delete student
router.delete("/students/:id", function (req, res, next) {
  let studentID = req.params.id;
  Student.destroy({ where: { id: studentID } })
    .then((rowsDeleted) => {
      if (rowsDeleted == 1) {
        return res.send("Deleted");
      } else {
        return res.send(404).json(["Not Found"]);
      }
    })
    .catch((err) => next(err)); // handle unexpected errors
});

module.exports = router;
