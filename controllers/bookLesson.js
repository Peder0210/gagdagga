module.exports = (req,res)=> {

    const Lesson = require("../models/lesson");
    const UserLesson = require("../models/userlesson");

    Lesson.find({_id:JSON.parse(req.params.lesson)}, (error, result)=> { // vi finder den lektion vi vil booke ud fra id'et
        if(result){
            UserLesson.find({lessonid:JSON.parse(req.params.lesson)}, (error1, result2)=> {
                // tjekker hvor mange Userlessons, som har det unikke id til den lektion der ønskes at booke.
                if(result2){
                    if(result2.length==result[0].Participants){ // result[0] er lektionen.
                        console.log("The Lesson is fully booked");
                        res.send("error2")
                    } else{
                        UserLesson.findOne({userid:req.session.userId, lessonid:JSON.parse(req.params.lesson)},(error3,result3)=> {
                            // Hvis der allerede er en UserLesson, som har præcis samme user:id, kan vi ikke booke denne lesson.
                            if (result3) {
                                console.log("You cannot book the same Lesson twice"); // undgå dobbeltbooking
                                res.send("error")
                            } else {
                                UserLesson.create({userid:req.session.userId, lessonid:JSON.parse(req.params.lesson)},(error4,result4)=> {
                                    if (result4) { // opretter UserLesson hvis kriterierne er opfyldt.
                                        res.send(JSON.stringify(result4))
                                    } else {
                                        res.send("UserLesson couldnt be created")
                                    }
                                })
                            }
                        })
                    }
                } else{
                    console.log("Error")
                }
            });
        } else{
            console.log("Error")
        }
    });
};