const crypto = require("crypto-js");
const moment = require("moment");
const { updateLocale } = require("moment/moment");
const currentdate = moment();
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
  createCompany = (userInputs) => {
    const datetime = currentdate.format("YYYY-MM-DD HH:mm:ss");
    var {
      id,
      companyName,
      gstNumber,
      email,
      phoneNumber,
      address,
      city,
      state,
      country,
      postalCode,
      ownerName,
      ownerEmail,
      ownerPhoneNumber,
      businessType,
      createDate,
      UpdateDate,
    } = userInputs;
    const handleUndefined = (value) =>
      value === undefined ? "null" : `'${value}'`;

    return `INSERT INTO tblcompany(userId,companyName,gstNumber,email,phoneNumber,address,city,state,country,postalCode,ownerName,ownerEmail,ownerPhoneNumber,businessType,createDate,UpdateDate) VALUES (${handleUndefined(
      id
    )}, ${handleUndefined(companyName)}, ${handleUndefined(
      gstNumber
    )}, ${handleUndefined(email)}, ${handleUndefined(
      phoneNumber
    )}, ${handleUndefined(address)}, ${handleUndefined(
      city
    )}, ${handleUndefined(state)}, ${handleUndefined(
      country
    )}, ${handleUndefined(postalCode)}, ${handleUndefined(
      ownerName
    )}, ${handleUndefined(ownerEmail)}, ${handleUndefined(
      ownerPhoneNumber
    )}, ${handleUndefined(businessType)}, '${createDate}',' ${UpdateDate}');`;
  };
  updateCompany = (userInputs) => {
    var {
      id,
      companyName,
      gstNumber,
      email,
      phoneNumber,
      address,
      city,
      state,
      country,
      postalCode,
      ownerName,
      ownerEmail,
      ownerPhoneNumber,
      businessType,

      UpdateDate,
    } = userInputs;
    const handleUndefined = (value) =>
      value === undefined ? "null" : `'${value}'`;

    return `UPDATE tblcompany SET companyName = ${handleUndefined(
      companyName
    )},gstNumber = ${handleUndefined(gstNumber)},email = ${handleUndefined(
      email
    )},phoneNumber = ${handleUndefined(
      phoneNumber
    )},address = ${handleUndefined(address)},city = ${handleUndefined(
      city
    )},state = ${handleUndefined(state)},country = ${handleUndefined(
      country
    )},postalCode = ${handleUndefined(
      postalCode
    )},ownerName = ${handleUndefined(ownerName)},ownerEmail = ${handleUndefined(
      ownerEmail
    )},ownerPhoneNumber = ${handleUndefined(
      ownerPhoneNumber
    )},businessType = ${handleUndefined(
      businessType
    )},UpdateDate = ${handleUndefined(UpdateDate)} WHERE id = ${handleUndefined(
      id
    )};`;
  };

  featchCompany = (id) => {
    return `select * from tblCompany Where userId= ${id.id}`;
  };
}
deleteCompany = (userInputs) => {};
featchCompany = (userInputs) => {};

module.exports = Querys;
