const Lesson = require("../models/lesson");
const Booking = require("../models/booking");
const User = require("../models/user");
module.exports =  (req,res) =>{
    Lesson.findOne({_id:req.params.lesson_title},(error,result)=>{ //finder den lektion man gerne vil ændre ud fra titel og returnerer dataen.
        if(result) {
         Booking.find({lessonid:result._id},(error2,result2)=>{ //finder den lektion man gerne vil ændre ud fra titel og returnerer dataen.
             if(result2) {
                 temp = [];
                 for(let i = 0; i<result2.length;i++){
                     temp.push(result2[i].userid)
                 }
                 console.log(temp);
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