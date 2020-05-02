const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userlessonSchema = new Schema ({
    userid: String,
    lessonid: String,
    Timestamp: {
        type: Date,
        default: Date.now}
});

const userlesson = mongoose.model('user/lesson', userlessonSchema);
module.exports = userlesson;