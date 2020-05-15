const Lesson = require("../models/lesson");
const Booking = require("../models/booking");


//
// Her oprettes en bookning til en bestemt lektion.
// Dette anvendes til siden lessonsCustomer.ejs
// - der har alle registreret lektioner samt muligheden for tilmeldning.
//

module.exports = (req,res)=>{
  // Finder den valgte lektion ud fra lektionens id.
  Lesson.find({_id:req.params.lesson_id}, (error, result)=> {
    // Hvis lektion er fundet.
    if(result){
      // Finder alle bookninger der indholder samme 'lessonid' som lektionen der skal bookes.
      Booking.find({lessonid:req.params.lesson_id}, (error2, result2)=> {
        // Hvis bookninger er fundet.
        if(result2){
          // Hvis lektionen er booket fuldt ud.
          if(result2.length>=result[0].MaxParticipants){
            console.log("The Lesson is fully booked");
            res.send("The Lesson is fully booked")
          }
          // Hvis lektionen ikke er fuldt ud booket.
          else{
            // Find en booking der har brugerens 'userId' og lektionens 'lessonid'.
            Booking.findOne({userid:req.session.userId, lessonid:req.params.lesson_id},(error3,result3)=>{
              // Hvis brugeren har booket lektionen allerede.
              if(result3){
                console.log("You cannot book the same Lesson twice");
                res.send("You cannot book the same Lesson twice");
              }
              // Hvis brugeren ikke har booket lektionen allerede.
              else{
                // Opretter en booking hvis kriterierne er opfyldt.
                Booking.create({userid:req.session.userId, lessonid:req.params.lesson_id},(error4,result4)=>{
                  // Hvis bookningen bliver oprettet.
                  if(result4){
                    res.send(JSON.stringify(result[0].Title));
                  }
                  // Hvis bookningen ikke bliver oprettet.
                  else{
                    console.log(error4);
                    res.send(JSON.stringify(error4));
                  }
                })
              }
            })
          }
        }
        else{
          console.log(error2);
          res.send(JSON.stringify(error2))
        }
      });
    }
    else{
      console.log(error);
      res.send(JSON.stringify(error))
    }
  });
};
