const g2drivePost = require("../models/g2drivePost");
module.exports = async (req, res) => {
  logid = req.session.userId;
  logType = req.session.userType;
  let error = false;
  const g2driveposts = await g2drivePost.findOne({ _id: req.session.userId }).populate("appointmentID");
  res.render("g2", {g2driveposts, error});
  };
  