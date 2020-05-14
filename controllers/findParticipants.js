const Lesson = require("../models/lesson");
const Booking = require("../models/booking");
const User = require("../models/user");
module.exports =  (req,res) =>{
    Lesson.findOne({_id:req.params.lesson_id},(error,result)=>{ //finder den lektion man gerne vil se ud fra id
        if(result) {
         Booking.find({lessonid:result._id},(error2,result2)=>{ //Finder alle bookninger med det samme lessonid
             if(result2) {
                 temp = [];//Pusher alle userid i bookningerne til et array
                 for(let i = 0; i<result2.length;i++){
                     temp.push(result2[i].userid)
                 }
                 console.log(temp);
                 User.find({_id: {$in: temp}}, (error3,result3)=>{//Alle brugere kan nu findes ud fra deres id i arrayet temp
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