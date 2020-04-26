const mongoose = require('mongoose');


const lesson = require('./models/lesson');
const administrator = require('./models/administrator');

mongoose.connect('mongodb://localhost:27017/wow'), {useNewUrlParser:true};

administrator.create({
        Username: "Admin",
        Password: "12345",
        Mail: "Admin@danseskole.dk",
    });

lesson.create({
    Title: "1",
    Locales: "2",
    Time: "3",
    Duration: "4",
    Participants: "5",
    Teachers: "6",
});