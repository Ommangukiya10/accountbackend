require("dotenv").config();
const mysql = require("mysql2");

const db = (name) => {
  // var cname = name.toUpperCase();
  // var dbName = process.env[`${cname}_DB`];t sta
  // var user = process.env[`${cname}_USER`];

  // var password = process.env[`${cname}_PASSWORD`];
  // var host = process.env[`${cname}_HOST`];

  // console.log(user);

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
