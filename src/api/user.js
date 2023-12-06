const { query } = require("express");
const { userServices } = require("../services");
const featchUser = require("./middleware/featchUser");
const user = new userServices();
module.exports = (app) => {
  //SingUp user
  app.post("/api/user/singUp", (req, res) => {
    let data = req.body;
    user.singUp(data, res);
  });

  //SingIn user
  app.post("/api/user/singIn", (req, res) => {
    let data = req.body;
    user.singIn(data, res);
  });

  //update user
  app.put("/api/user", featchUser, (req, res) => {
    var data = req.user;
    data = req.body;
    console.log(data);
  });

  //create company
  app.post("/api/compnany", featchUser, (req, res) => {
    var data = req.body;
    var id = req.user;
    const combinedJson = {
      ...data,
      ...id,
    };
    // res.send(combinedJson);
    user.createCompany(combinedJson, res);
  });

  //update company
  app.put("/api/compnany/:id", featchUser, (req, res) => {
    var data = req.body;
    const id = req.params.id;
    const combinedJson = {
      ...data,
      id,
    };

    user.updateCompany(combinedJson, res);
  });

  app.get("/api/compnany", featchUser, (req, res) => {
    var datid = req.user;
    // console.log({ ...datid });
    user.featchCompany({ ...datid }, res);
  });
};
