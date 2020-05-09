const User = require('../models/user');
const Lesson = require("../models/lesson");
module.exports = (req,res) => {

    console.log(req.session);
    // Vi tjekker om req.session userid er en Admin, fordi en customer ikke må have adgang til
    // at oprette en lesson
    User.findOne({$and:[{_id:req.session.userId},{Usertype: "Admin"}]},(error,result)=>{
        if(result){
            console.log(result);
            // Vi opretter en lesson. For at vi kan sende objektet lessonInfo gennem databasen, benytter vi JSON.parse
            Lesson.create(JSON.parse(req.params.lesson_obj), (error2, result2) => {
                if (result2) {
                    // JSON.stringify gør, at vi henter dataen tilbage
                    console.log("Lesson have been created");
                    res.send(JSON.stringify(result2));
                } else {
                    // Alle lektioner skal have et unikt lektionsnavn
                    console.log("Your lesson doesn't have an unique Title");
                    res.send("Your lesson doesn't have an unique Title")
                }
            })
        } else {
            console.log("Please log in as an Admin");
            res.send("Please log in as an Admin") // vi smider forskellige strings ind, for at detektere fejl hurtigere
        }
    })
};

