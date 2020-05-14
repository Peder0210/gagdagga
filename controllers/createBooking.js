const Lesson = require("../models/lesson");
const Booking = require("../models/booking");

module.exports =  (req,res)=> {
    Lesson.find({_id:req.params.lesson_id}, (error, result)=> { // vi finder den lektion vi vil booke ud fra id'et
        if(result){
           Booking.find({lessonid:req.params.lesson_id}, (error2, result2)=> {  // Finder alle bookings, der indeholder samme lessonid, som lektionen, der skal bookes.
                if(result2){
                    if(result2.length>=result[0].MaxParticipants){
                        // result2.length er antallet af bookninger, der er lavet til den enkelte lektion. Hvis result2.length er lig med eller højere end MaxParticipants, får brugeren ikke lov til at booke
                        console.log("The Lesson is fully booked");
                        res.send("The Lesson is fully booked")
                    } else{
                        Booking.findOne({userid:req.session.userId, lessonid:req.params.lesson_id},(error3,result3)=> {
                            // Hvis der allerede findes en Bookning, som har præcis det samme user:id, vil det betyde, at en identitisk bookning allerede eksisterer i databasen
                            if (result3) {
                                console.log("You cannot book the same Lesson twice"); // Dermed undgås dobbeltbooking
                                res.send("You cannot book the same Lesson twice")
                            } else {
                        Booking.create({userid:req.session.userId, lessonid:req.params.lesson_id},(error4,result4)=> {
                                    if (result4) { // opretter Bookningen hvis kriterierne er opfyldt.
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

