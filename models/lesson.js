const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonsSchema = new Schema ({
    Title:  {
        type: String,
        unique: true
    },
    Room: String,
    Time: String,
    Duration: String,
    Participants: String,
    Teacher: String,
    Timestamp: {
        type: Date,
        default: Date.now}
});

const lesson = mongoose.model('lesson', lessonsSchema);
module.exports = lesson;