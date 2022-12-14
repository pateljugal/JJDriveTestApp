const g2drivePost = require("../models/g2drivePost");

module.exports = async ( req, res ) => {
    if(req.body.comment && req.body.option){
        let updateData ={
            comment: req.body.comment,
            testResult: req.body.option
        }
        await g2drivePost.findOneAndUpdate( { _id: req.body.id }, updateData)

        g2drivePost.find( { appointmentID: { $ne: null }, testResult: null })
        .populate( "appointmentID", { match: { isTimeSlotAvailable: false } })
        .exec( ( error, driver ) => {
            if(driver.length > 0 ) {
                res.render( "examinarAppointment", {
                    error: false,
                    errormsg: "",
                    driver: driver,
                    filteredBy: "all",
                    id: req.body.id
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
    }else {
        g2drivePost.find( { appointmentID: { $ne: null }, testResult: null })
        .populate( "appointmentID", { match: { isTimeSlotAvailable: false } })
        .exec( ( error, driver ) => {
            if(driver.length > 0 ) {
                res.render( "examinarAppointment", {
                    error: true,
                    errormsg: "enter all fileds.",
                    driver: driver,
                    filteredBy: "all",
                    id: req.body.id
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
    }
}
