const g2drivePost = require("../models/g2drivePost");

module.exports = async (req, res) => {
    const {filterby} = req.params
    g2drivePost.find( { appointmentType: filterby, appointmentID: { $ne: null }, testResult: null })
    .populate( "appointmentID", { match: { isTimeSlotAvailable: false } } )
    .exec( ( error, driver ) => {
        if(driver.length > 0 ) {
            res.render( "examinarAppointment", {
                error: false,
                errormsg: "",
                driver: driver,
                filteredBy: filterby,
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
    } )
};
