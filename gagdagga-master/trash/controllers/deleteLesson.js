const Lesson = require("../models/lesson");
const Booking = require("../models/booking");

module.exports = (req,res)=> {
    console.log(req.params.lesson_title);
    Lesson.deleteOne({_id: req.params.lesson_id}, (error, result) => { // du sletter lektionen ud fra den informerede ID i req.params
        if (result) {
            //Du skal også huske at slette alle bookninger, der har samme lessonid, så der ikke opstår bookninger, der refererer til et ikke eksisterende lektioner.
            Booking.deleteMany({lessonid:req.params.lesson_id}, (error, result) =>{
                if(result){
                    console.log("Bookings deleted");
                } else {
                    console.log("No bookings found")
                }
            });
            console.log("Lesson deleted");
            res.send(JSON.stringify(result))
        } else {
            res.send("No User found")
        }
    })
};