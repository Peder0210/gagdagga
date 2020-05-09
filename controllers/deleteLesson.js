const Lesson = require("../models/lesson");
const Booking = require("../models/booking");
module.exports = (req,res)=> {


    console.log(req.params.lesson_title);
    Lesson.deleteOne({_id: req.params.lesson_title}, (error, result) => { // du sletter en lektion ud fra den informerede titel
        if (result) {
            Booking.deleteMany({lessonid:req.params.lesson_title}, (error, result) =>{
                if(result){
                    console.log("Bookings deleted");
                } else {
                    console.log("No bookings found")
                }
            });
            console.log("User deleted");
            res.send(JSON.stringify(result))
        } else {
            res.send("No User found")
        }
    })
};