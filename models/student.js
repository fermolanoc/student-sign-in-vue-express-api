module.exports = (sequelize, DataTypes) => {
  let Student = sequelize.define("Student", {
    // Define Student attributes and their data types
    name: {
      type: DataTypes.STRING,
    },
    starID: {
      type: DataTypes.STRING,
    },
    present: {
      type: DataTypes.BOOLEAN,
    },
  });

  // force = true will delete the table every times app restarts, and will create the table and attributes again
  Student.sync({ force: false }).then(() => {
    console.log("Synced student table");
  });

  return Student;
};
