const mysql = require("mysql2");

const db = (database) => {
  const connection = mysql.createConnection({
    database: database,
    user: "root",
    password: "",
    host: "localhost",
  });

  connection.connect((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Database connected");
    }
  });

  return connection;
};

module.exports = db;
