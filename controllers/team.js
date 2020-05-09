const Lesson = require("../models/lesson");
const Booking = require("../models/booking");
const User = require("../models/user");
module.exports =  (req,res) =>{
console.log("hej");


    Lesson.findOne({_id:req.params.lesson_title},(error,result)=>{ //finder den lektion man gerne vil ændre ud fra titel og returnerer dataen.
        if(result) {
            console.log("hej2");
         Booking.find({lessonid:result._id},(error2,result2)=>{ //finder den lektion man gerne vil ændre ud fra titel og returnerer dataen.
             if(result2) {
                 console.log("hej3");
                 temp = [];
                 for(let i = 0; i<result2.length;i++){
                     temp.push(result2[i].userid)
                 }
                 console.log(temp)
                 User.find({_id: {$in: temp}}, (error3,result3)=>{
                     if(result3){
                         console.log("hej4");
                         console.log(result3);
                         res.send(result3)
                     }
                 })

             }
             else{
                 res.send("No profiles found")
             }
         })
        }
        else{
            res.send("No profiles found")
        }
    })
};