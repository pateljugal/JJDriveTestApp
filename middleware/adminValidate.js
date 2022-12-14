const g2drivePost = require("../models/g2drivePost");
module.exports = (req, res, next) => {
  logid = req.session?.userId;
  logType = req.session.userType;
  if( !req.session.userId ) {
    return res.redirect( "/login" )
  }
  g2drivePost.findById(req.session.userId, (error, user) => {
    if (error || !user) {
      return res.redirect("/");
    }
    if( user.userType !== 'Admin' ) {
      return res.redirect( "/" )
    }
    next();
  });
};
