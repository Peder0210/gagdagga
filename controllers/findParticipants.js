const Lesson = require("../models/lesson");
const Booking = require("../models/booking");
const User = require("../models/user");


//
// Her findes alle deltagere til en bestemt lektion.
// Dette anvendes til siden findPart.ejs
// - der er en side til at vise deltagere i en bestemt lektion.
//


module.exports =  (req,res) =>{
  // Find den bestemte lektion i databasen
  Lesson.findOne({_id:req.params.lesson_id},(error,result)=>{ //finder den lektion man gerne vil se ud fra id
    if(result) {
      // Find alle bookninger til den lektion
      Booking.find({lessonid:result._id},(error2,result2)=>{ //Finder alle bookninger med det samme lessonid
       if(result2) {
        //Pusher alle userid i bookningerne til et array
        temp = [];
        for(let i = 0; i<result2.length;i++){
          temp.push(result2[i].userid)
        }
        console.log(temp);
        // Find alle brugere ud fra bookningerne (Bookings består af 'lessonid' og 'userid').
        User.find({_id: {$in: temp}}, (error3,result3)=>{
          if(result3){
            console.log(result3);
            res.send(result3)
          }
        })
      }
      else{
        res.send("No bookings found")
      }
     })
    }
    else{
      res.send("No Lesson found")
    }
  })
};
