module.exports = (req, res) => {
    let validation = {
      confirmpass: false,
      invalidpass: false,
    }
    logid = req.session.userId;
    logType = req.session.userType;
  
    res.render("login", { validation });
  };
  