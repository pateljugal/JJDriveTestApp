const AppointmentSlot = require( "../models/appointmentSlot" )

module.exports = async ( req, res ) => {
    let appointmentSlot = await AppointmentSlot.find({date: req.params.date})
    if(appointmentSlot) {
        res.status(200).send({ appointmentSlot })
      }
}
