const g2drivePost = require("../models/g2drivePost");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  let validation = {
    confirmpass: false,
    invalidpass: true,
  };

  const usrerdata = await g2drivePost.findOne({ username: req.body.uname });
  if (!usrerdata || !bcrypt.compareSync(req.body.password, usrerdata.password)) {
    res.render("login", { validation });
  } else {
    req.session.userId = usrerdata._id;
    req.session.userType = usrerdata.userType;
    logid = req.session.userId;
    logType = req.session.userType;

    res.render("index");
  }
};
