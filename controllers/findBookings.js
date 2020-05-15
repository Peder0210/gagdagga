const Booking = require("../models/booking");
const Lesson = require("../models/lesson");


//
// Her retuneres alle lektionerne den enkelte bruger har tilmeldt sig.
// Dette anvendes til siden myBookings.ejs
// - der viser de tilmeldte lektioner og detaljer.
//


module.exports = (req,res)=> {
  // Finder alle brugerns bookninger, ud fra 'userid'.
  Booking.find({userid: req.session.userId}, (error,result) => {
    // Hvis bookninger er fundet.
    if(result){
      // Alle bookningernes 'lessonid' tilføjes til et midlertidigt array.
      var temp = [];
      for(var i=0;i<result.length;i++){
        if(result[i].lessonid){
          temp.push(result[i].lessonid);
        }
      }
      // Finder de lektioner der er booket af brugeren, og sender dem tilbage. Dette er muligt på grund at arrayet, der indeholder lessonid
      Lesson.find({_id:{$in:temp}}, (error1, result1) => {
        if(result1){
          res.send(JSON.stringify(result1));
        }
        else{
          res.send("No Lessons found");
        }
      })
    }
    // Hvis ingen bookninger er fundet.
    else{
      res.send("No bookings founds");
    }
  });
};
