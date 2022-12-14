module.exports = async (req, res) => {
  logid = req.session.userId;
  logType = req.session.userType;;
  
    res.render("index");
  };
  