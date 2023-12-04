const crypto = require("crypto-js");

class Querys {
  singUp = (userInputs) => {
    const key = process.env.KEY;

    const { email, password, userName } = userInputs;
    var encPass = crypto.HmacSHA1(password, key).toString(crypto.enc.Hex);
    return `insert into tblUser(email,userName,password) values('${email}','${userName}','${encPass}')`;
  };
  checkUser = (userInputs) => {
    const { email } = userInputs;
    return `select * from tbluser where  email='${email}'`;
  };
  singIN = (userInputs) => {
    const key = process.env.KEY;
    const { email, password, userName } = userInputs;
    var encPass = crypto.HmacSHA1(password, key).toString(crypto.enc.Hex);
    if (email != null || email != "") {
      return `select * from tbluser where  email='${email}' and password = '${encPass}'`;
    } else {
      return `select * from tbluser where  userName='${userName}' and password = '${encPass}'`;
    }
  };
  updateUser = (userInputs) => {
    const { email, password, userName, id } = userInputs;
    return `UPDATE tbl_user SET email='${email}', userName='${userName}', password='${password}' WHERE id=${id};`;
  };
}

module.exports = Querys;
