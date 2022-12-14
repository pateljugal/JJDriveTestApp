require("dotenv").config();

const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const g2drivePost = require("./models/g2drivePost");

const gPost = require("./controller/gPost");
const g2Post = require("./controller/g2Post");
const homeindexPost = require("./controller/homeindexPost");
const loginPost = require("./controller/loginPost");
const storeUser = require("./controller/storeUser");
const signinPost = require("./controller/signinPost");
const signUpPost = require("./controller/signUpPost");
const updatePost = require("./controller/updatePost");
const logout = require("./controller/logout");
const appointment = require("./controller/appointment");
const addSlot = require("./controller/addSlot");
const getSlot = require("./controller/getSlot");
const examinarAppointment = require("./controller/examinarAppointment");
const addResult = require("./controller/addResult");
const filterAppointment = require("./controller/filterAppointment");
const result = require("./controller/result");

var MongoClient = require('mongodb').MongoClient;
const expressSession = require("express-session");
const driverValidate = require("./middleware/driverValidate");
const adminValidate = require("./middleware/adminValidate");
const examinerValidate = require("./middleware/examinerValidate");
const redirecttopage = require("./middleware/redirecttopage");
const app = new express();

global.logid = null;
global.logType = null;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.use("*", (req, res, next) => {
  if (req.session) {
    logid = req.session.userId;
    logType = req.session.userType;
  } else {
    logid = req.session?.userId;
    logType = req.session?.userType;
  }
  next();
});
app.use(
  expressSession({
    secret: "Jugal096Jaina058",
  })
);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const port = 4002;

app.get("/", homeindexPost);

app.get("/g", driverValidate,gPost);

app.get("/g2", driverValidate,g2Post);

app.post("/save", driverValidate, storeUser);

app.post("/update", driverValidate, updatePost);

app.get("/login", loginPost);

app.post("/SingUp", redirecttopage, signUpPost);

app.post("/Signinpost", redirecttopage, signinPost);

app.get("/logout", logout);

app.get("/appointment-slot",adminValidate, appointment);

app.post("/add-slot",adminValidate, addSlot );

app.get("/get-slot/:date", getSlot);

app.get("/exaimnar-appointment",examinerValidate, examinarAppointment);

app.get("/exaimnar-appointment/:filterby",examinerValidate, filterAppointment);

app.post("/add-result",examinerValidate, addResult );

app.get("/get-result",adminValidate, result);

app.listen(port, () => {
  console.log("App Listening on Port " + port);
});