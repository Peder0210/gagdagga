const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonsSchema = new Schema ({
    Title: String,
    Locales: String,
    Time: String,
    Duration: String,
    Participants: String,
    Teachers: String,

});

const lesson = mongoose.model('lesson', lessonsSchema);
module.exports = lesson;