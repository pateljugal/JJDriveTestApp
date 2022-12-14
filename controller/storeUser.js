const g2drivePost = require("../models/g2drivePost");
const AppointmentSlot = require("../models/appointmentSlot")

module.exports = async (req, res, error) => {
  logid = req.session.userId;
  logType = req.session.userType;

  const g2driveposts = await g2drivePost.findOne({ _id: req.session.userId }).populate("appointmentID");

  if(req.body?.option && req.body?.slotDate && req.body.fname && req.body.lname && req.body.Age && req.body.date && req.body.appointmentType && req.body.make && req.body.Model && req.body.Year && req.body.numberplate){
    const appointmentSlot = await AppointmentSlot.findOne({ time: req.body?.option, date: req.body?.slotDate });
  
    await AppointmentSlot.findOneAndUpdate({ _id: appointmentSlot._id },
      { isTimeSlotAvailable: false }
    );
    await g2drivePost.findOneAndUpdate(
      { _id: req.session.userId },
      {
        ...req.body,
      appointmentID: appointmentSlot._id,
      Car_details: {
          make: req.body.make,
          Model: req.body.Model,
          Year: req.body.Year,
          numberplate: req.body.numberplate,
      },
      }
    );

    if (req.session.userId) {
      const g2driveposts = await g2drivePost.findOne({ _id: req.session.userId }).populate("appointmentID");
      let error = false
      if(req.body.appointmentType == "g"){
        res.render("g", { g2driveposts, error });
      }else {
        res.render("g2", { g2driveposts, error });
      }
    } else {
      res.redirect("/");
    }
  }else {
    let error = true
    if(req.body.appointmentType == "g"){
      res.render("g", { g2driveposts, error });
    }else {
      res.render("g2", { g2driveposts, error });
    }
  }
};
