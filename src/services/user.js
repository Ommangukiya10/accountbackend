const database = require("../database");
const db = database("user");
const Querys = require("../config/querys");
const Query = new Querys();
const JWT = require("jsonwebtoken");
const { query } = require("express");

class userServices {
  async singUp(userInputs, res) {
    let flag = false;
    const key = process.env.JWT_KEY;
    var checkQuery = Query.checkUser(userInputs);
    db.query(checkQuery, (err, data) => {
      if (err) {
        res.send(500);
      }
      if (data.length > 0) {
        flag = false;
        res.status(200).json({ flag: flag, message: "Account alredy exist" });
      } else {
        var creQuery = Query.singUp(userInputs);

        db.query(creQuery, (error, data) => {
          if (error) {
            res.status(500).send(error.message);
          } else {
            flag = true;
            res
              .status(200)
              .json({ flag: flag, message: "Account Created successfully" });
          }
        });
      }
    });
  }
  async singIn(userInputs, res) {
    let flag = false;
    const key = process.env.JWT_KEY;
    var Loginquery = Query.singIN(userInputs);
    db.query(Loginquery, (err, data) => {
      if (err) {
        res.send(500);
        console.log(err.message);
      }

      if (data.length > 0) {
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
        flag = true;
        res
          .status(200)
          .json({ flag: flag, message: "Login successfully", data: resdata });
      } else {
        flag = false;
        res
          .status(200)
          .json({ flag: flag, message: "Password Or Email Incorrect " });
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
        res.json({ message: "Internal server error" });
      } else {
        res.status(200).json({ message: "Company Created Successfully" });
      }
    });
  }
  async updateCompany(userInputs, res) {
    var query = Query.updateCompany(userInputs);
    db.query(query, (err, data) => {
      if (err) {
        res.json({ message: "Internal server error" });
      } else {
        if (data.affectedRows > 0) {
          res.status(200).json({ message: "Company updated Successfully" });
        } else {
          res.status(200).json({ message: "No Company Founded" });
        }
      }
    });
  }
  // featch Company
  async featchCompany(id, res) {
    var query = Query.featchCompany(id);
    db.query(query, (err, data) => {
      if (err) {
        res.json({ message: "Internal server error" });
      } else {
        if (data.length > 0) {
          res.status(200).json({ message: "featch successfully", data: data });
        } else {
          res.status(200).json({ message: "Not Founded Registered Company" });
        }
      }
    });
  }

  // deleting company
  async deleteCommpany(id, res) {
    var query = Query.deleteCompany(id, res);
    db.query(query, (err, data) => {
      if (err) {
        console.log(err.message);
        res.json({ message: "Internal server error" });
      } else {
        if (data.affectedRows) {
          res.status(200).json({ message: "Company Deleted Successfully" });
        } else {
          res.status(200).json({ message: "No Company Founded To delete" });
        }
      }
    });
  }
}

module.exports = userServices;
