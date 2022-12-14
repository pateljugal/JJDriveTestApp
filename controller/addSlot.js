const AppointmentSlot = require( "../models/appointmentSlot" )

module.exports = async ( req, res ) => {
    if( req.body.option && req.body.date){
        let slot = await AppointmentSlot.findOne({ time: req.body.option, date: req.body.date });
        let isSlot = false;
        if(!slot){
            await AppointmentSlot.create({
                date: req.body.date,
                time: req.body.option,
                isTimeSlotAvailable: true,
            });
        }else {
            isSlot = true;
        }
        res.render("appointment", {isSlot});
    }
    
  
}
