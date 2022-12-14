const mongoose = require( "mongoose" )

const AppointmentSlotSchema = new mongoose.Schema( {
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    isTimeSlotAvailable: {
        type: Boolean
    }
})

const Appointment = mongoose.model( "appointmentSlot", AppointmentSlotSchema )

module.exports = Appointment
