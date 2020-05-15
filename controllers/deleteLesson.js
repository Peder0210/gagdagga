const Lesson = require("../models/lesson");
const Booking = require("../models/booking");


//
// Her slettes en bestemt lektion.
// Dette anvendes til siden myBookings.ejs
// - der er en admin side, med fuldmagt over platformen.
//


module.exports = (req,res)=> {
  console.log(req.params.lesson_title);
  // du sletter lektionen ud fra den informerede ID i req.params
  Lesson.deleteOne({_id: req.params.lesson_id}, (error, result)=>{
    if(result){
      // Alle bookninger der har samme 'lessonid' slettes samtidig, så der ikke opstår bookninger, der refererer til et ikke eksisterende lektion.
      Booking.deleteMany({lessonid:req.params.lesson_id}, (error, result)=>{
        if(result){
          console.log("Bookings deleted");
        }
        else{
          console.log("No bookings found");
        }
      });
      console.log("Lesson deleted");
      res.send(JSON.stringify(result));
    }
    else{
      res.send("No User found");
    }
  })
};
