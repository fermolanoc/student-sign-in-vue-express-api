module.exports = (sequelize, DataTypes) => {
  let Student = sequelize.define("Student", {
    // Define Student attributes and their data types
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    starID: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // check starID matches this format - 2 letters, 4 numbers, 2 letters
        is: /^[a-z]{2}\d{4}[a-z]{2}$/,
      },
    },
    present: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  // force = true will delete the table every times app restarts, and will create the table and attributes again
  Student.sync({ force: false }).then(() => {
    console.log("Synced student table");
  });

  return Student;
};
