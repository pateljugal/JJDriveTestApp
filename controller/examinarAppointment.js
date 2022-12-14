const g2drivePost = require("../models/g2drivePost");

module.exports = async (req, res) => {
      g2drivePost.find( { appointmentID: { $ne: null }, testResult: null })
    .populate( "appointmentID", { match: { isTimeSlotAvailable: false } } )
    .exec( ( error, driver ) => {
        if(driver.length > 0 ) {
            res.render( "examinarAppointment", {
                error: false,
                errormsg: "",
                driver: driver,
                filteredBy: "all",
                id: null
            })
        }else {
            res.render( "examinarAppointment", {
                error: false,
                errormsg: "",
                driver: null,
                filteredBy: "",
                id: null
            })
        }
    })
};
