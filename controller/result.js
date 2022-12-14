const g2drivePost = require("../models/g2drivePost");
module.exports = async (req, res) => {
    logid = req.session.userId;
    logType = req.session.userType;
    g2drivePost.find( { appointmentID: { $ne: null }, testResult: { $ne: null } })
    .populate( "appointmentID", { match: { isTimeSlotAvailable : false } } )
    .exec( ( error, driver ) => {
        if(driver.length > 0 ) {
            res.render( "result", {
                error: false,
                errormsg: "",
                driver: driver,
            })
        } else {
            res.render( "result", {
                error: true,
                errormsg: "No result found",
                driver: null,
            })
        }

    } )
};