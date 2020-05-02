var mongoose = require("mongoose");
const lesson = require('../models/lesson');





module.exports = (req,res) =>{

    lesson.find({
        "Title":"g"
    }, function(err,lessons){
        if(err){
            onErr(err,callback);
        } else {
            mongoose.connection.close;
            console.log(lessons);
            callback("",lessons)
        }
    });};




