const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema ({
  userid: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
    required: true
  },
  lessonid: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Lesson",
    required: true
  },
  Timestamp: {
    type: Date,
    default: Date.now}
});

const booking = mongoose.model('booking', bookingSchema);
module.exports = booking;
