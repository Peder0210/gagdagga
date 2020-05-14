const Booking = require("../models/booking");
const Lesson = require("../models/lesson");

module.exports = (req,res)=> {
    Booking.find({userid: req.session.userId}, (error,result) => {
        if(result){ // returnere alle bookninger baseret på brugerens id.
            var temp = []; // her oprettes et array, hvor bookningernes lessonid bliver tilføjet
            for(var i=0;i<result.length;i++){
                if(result[i].lessonid){
                    temp.push(result[i].lessonid)
                }
            }
            Lesson.find({_id:{$in:temp}}, (error1, result1) => {
                if (result1) { // vi finder de Lessons, hvis id er i temp-arrayet. Altså de lektioner, der er booket af brugeren
                    res.send(JSON.stringify(result1))
                } else {
                    res.send("No Lessons found")
                }
            })
        } else{
            res.send("No bookings founds")
        }
    });
};