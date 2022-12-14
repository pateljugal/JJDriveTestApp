module.exports = async (req, res) => {
    logid = req.session.userId;
    logType = req.session.userType;
    let isSlot = false;

    res.render("appointment", {isSlot});

};