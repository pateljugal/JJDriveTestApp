const g2drivePost = require("../models/g2drivePost");

module.exports = async (req, res, error) => {
  let validation = {
    confirmpass: false,
    invalidpass: false,
  };

  if (req.body.password == req.body.Repeatpassword) {
    await g2drivePost.create({
      username: req.body.uname,
      password: req.body.password,
      userType: req.body.UserType,
    });
  } else {
    validation.confirmpass = true;
  }
  res.render("login", { validation });
};
