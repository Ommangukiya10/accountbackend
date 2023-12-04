const { userServices } = require("../services");
const featchUser = require("./middleware/featchUser");
const user = new userServices();
module.exports = (app) => {
  app.post("/api/user/singUp", (req, res) => {
    let data = req.body;
    user.singUp(data, res);
  });

  app.post("/api/user/singIn", (req, res) => {
    let data = req.body;
    user.singIn(data, res);
  });
  app.get("/api/user", featchUser, (req, res) => {
    console.log(req.user);
    res.json({ message: "welcom to authenticate part", data: req.user });
  });
  app.post("/api/user/update", featchUser, (req, res) => {
    var data = req.user;
    data = req.body;
    console.log(data);
  });
};
