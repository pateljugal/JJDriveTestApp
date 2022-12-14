const g2drivePost = require("../models/g2drivePost");

module.exports = async (req, res, error) => {
  logid = req.session.userId;
  logType = req.session.userType;
  const g2driveposts = await g2drivePost.findOne({ _id: req.session.userId }).populate("appointmentID");

  await g2drivePost.findOneAndUpdate(
    { _id: req.session.userId },
    {
      fname: req.body.fname ? req.body.fname : g2driveposts.fname,
      lname: req.body.lname ? req.body.lname : g2driveposts.lname,
      Age: req.body.Age ? req.body.Age : g2driveposts.Age,
      date: req.body.date ? req.body.date : g2driveposts.date,
      Car_details: {
        make: req.body.make ? req.body.make : g2driveposts.Car_details.make,
        Model: req.body.Model ? req.body.Model : g2driveposts.Car_details.Model,
        Year: req.body.Year ? req.body.Year : g2driveposts.Car_details.Year,
        numberplate: req.body.numberplate ? req.body.numberplate : g2driveposts.Car_details.numberplate,
      },
    }
  );
  if (req.session.userId) {
    let error = false;
    const g2driveposts = await g2drivePost.findOne({ _id: req.session.userId }).populate("appointmentID");
    if(req.body.appointmentType == "g"){
      res.render("g", { g2driveposts, error });
    }else {
      res.render("g2", { g2driveposts, error });
    }
  } else {
    res.redirect("/");
  }
};
