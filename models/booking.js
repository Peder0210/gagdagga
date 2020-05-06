const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema ({
    userid: String,
    lessonid: String,
    Timestamp: {
        type: Date,
        default: Date.now}
});

const booking = mongoose.model('booking', bookingSchema);
module.exports = booking;