const database = require("../database");
const db = database("user");
const Querys = require("../config/querys");
const Query = new Querys();
const JWT = require("jsonwebtoken");

class userServices {
  async singUp(userInputs, res) {
    const key = process.env.JWT_KEY;
    var checkQuery = Query.checkUser(userInputs);
    db.query(checkQuery, (err, data) => {
      if (err) {
        res.send(500);
      }
      if (data.length > 0) {
        res.status(200).json({ message: "Account alredy exist" });
      } else {
        var creQuery = Query.singUp(userInputs);

        var a = db.query(creQuery, (error, data) => {
          if (error) {
            res.status(500).send(error.message);
          } else {
            res.status(200).json({ message: "Account Created successfully" });
          }
          const data1 = {
            user: {
              id: data.insertId,
            },
          };
          const token = JWT.sign(data1, key);
        });
      }
    });
  }
  async singIn(userInputs, res) {
    const key = process.env.JWT_KEY;
    var Loginquery = Query.singIN(userInputs);

    db.query(Loginquery, (err, data) => {
      if (err) {
        res.send(500);
        console.log(err.message);
      }
      const data1 = {
        user: {
          id: data[0]["id"],
        },
      };
      const token = JWT.sign(data1, key);
      const resdata = {
        data: data[0],
        auth_token: token,
      };
      if (data.length > 0) {
        res.status(200).json({ message: "Login successfully", data: resdata });
      }
    });
  }
  async update(userInputs, res) {
    var updateQuery = Query.updateUser(userInputs);
    db.query(updateQuery, (err, data) => {
      if (err) {
        res.status(500);
      }
      res.status(200).json({ message: "Update Successfully", data: data });
    });
  }

  async createCompany(userInputs, res) {
    var query = Query.createCompany(userInputs);
    db.query(query, (err, data) => {
      if (err) {
        console.log(err.message);
        res.json({ message: "Internal server error" });
      } else {
        console.log(data);
        res.status(200).json({ message: "Company Created Successfully" });
      }
    });
  }
  async updateCompany(userInputs, res) {
    var query = Query.updateCompany(userInputs);
    db.query(query, (err, data) => {
      if (err) {
        console.log(err.message);
        res.json({ message: "Internal server error" });
      } else {
        res.status(200).json({ message: "Company updated Successfully" });
      }
    });
  }
  async featchCompany(id, res) {
    var query = Query.featchCompany(id);
    db.query(query, (err, data) => {
      if (err) {
        console.log(err.message);
        res.json({ message: "Internal server error" });
      } else {
        if (data.length > 0) {
          res
            .status(200)
            .json({ message: "featch successfully", data: data[0] });
        } else {
          res.status(200).json({ message: "No company found " });
        }
      }
    });
  }
}

module.exports = userServices;
