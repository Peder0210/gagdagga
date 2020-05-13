const Lesson = require("../models/lesson");
const Booking = require("../models/booking");

module.exports =  (req,res)=> {



    Lesson.find({_id:req.params.lesson_id}, (error, result)=> { // vi finder den lektion vi vil booke ud fra id'et
        if(result){
           Booking.find({lessonid:req.params.lesson_id}, (error2, result2)=> {
                // tjekker hvor mange Userlessons, som har det unikke id til den lektion der ønskes at booke.
                if(result2){
                    if(result2.length>=result[0].Participants){ // result[0] er lektionen.
                        console.log("The Lesson is fully booked");
                        res.send("The Lesson is fully booked")
                    } else{
                        //for loop
                Booking.findOne({userid:req.session.userId, lessonid:req.params.lesson_id},(error3,result3)=> {
                            // Hvis der allerede er en UserLesson, som har præcis samme user:id, kan vi ikke booke denne lesson.
                            if (result3) {
                                console.log("You cannot book the same Lesson twice"); // undgå dobbeltbooking
                                res.send("You cannot book the same Lesson twice")
                            } else {
                        Booking.create({userid:req.session.userId, lessonid:req.params.lesson_id},(error4,result4)=> {
                                    if (result4) { // opretter UserLesson hvis kriterierne er opfyldt.
                                        res.send(JSON.stringify(result[0].Title))
                                    } else {
                                       console.log(error4);
                                       res.send(JSON.stringify(error4))

                                    }
                                })
                            }
                        })
                    }
                } else{
                    console.log(error2);
                    res.send(JSON.stringify(error2))
                }
            });
        } else{
            console.log(error);
            res.send(JSON.stringify(error))
        }
    });
};

//Test
