const mongoose = require("mongoose");
const g2drivePost = require("./models/g2drivePost");

mongoose.connect(
  "mongodb+srv://jugal:jilu@cluster0.z49jton.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

g2drivePost.create(
  {
    fname: "Jugal",
    lname: "Patel",
    age: "25",
  },
  (error, g2drivePost) => {
    console.log(error, g2drivePost);
  }
);
