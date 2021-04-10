let { Sequelize, DataTypes } = require("sequelize");

// env will try to detect which environment the app is running on
// if it detects Heroku environment, then DB defined in production will be applied (postgres)
// otherwise it'll use sqlite which is defined on development mode on config.json (local mode = no environment)
let env = process.env.NODE_ENV || "development";

let config = require(__dirname + "/../config.json")[env];

// initialize empty db
let db = {};

let sequelize;

if (config.use_env_variable) {
  // when using Heroku, use postgres
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // when running locally (development mode), use SQLite
  sequelize = new Sequelize(config);
}

// require code from 'student.js' file
// there is a function inside that requires 2 arguments,
// we'll pass sequelize which contains development or production mode
// and the DataTypes
let studentModel = require("./student")(sequelize, DataTypes);

//
db[studentModel.name] = studentModel;
db.sequelize = sequelize; // information on how to connect to database
db.Sequelize = Sequelize; // Sequelize library

module.exports = db;
