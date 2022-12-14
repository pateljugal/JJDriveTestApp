const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const Drivetestschema = new Schema({

    fname: String,
    lname: String,
    lnumber: String,
    Age: String,
    date:String,
    Car_details: {
        make: String,
        Model:String,
        Year: String,
        numberplate: String,

    },
    username: String,
    userType: String,
    password: String,
    appointmentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointmentSlot"
    },
    appointmentType: String,
    comment: String,
    testResult: String,
});
 
  Drivetestschema.pre("save", function (next) {
    const pass = this;
    bcrypt.hash(pass.password, 10, (error, hash) => {
      pass.password = hash;

      next();
    });
  });

const g2drivePost = mongoose.model('g2drivepost', Drivetestschema);

module.exports = g2drivePost;