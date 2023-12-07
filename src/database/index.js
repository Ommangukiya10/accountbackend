require("dotenv").config();
const mysql = require("mysql2");

const db = (name) => {
  const connection = mysql.createConnection({
    database: "user",
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
