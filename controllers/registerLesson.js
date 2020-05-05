module.exports = (req,res) => {

    const User = require('../models/user');
    const Lesson = require("../models/lesson");

    console.log(req.session);
    // Vi tjekker om req.session userid er en Admin, fordi en customer ikke må have adgang til
    // at oprette en lesson
    User.findOne({$and:[{_id:req.session.userId},{Usertype: "Admin"}]},(error,result)=>{
        if(result){
            console.log(result);
            console.log(JSON.parse(req.params.lessonInfo));
            // Vi opretter en lesson. For at vi kan sende objektet lessonInfo gennem databasen, benytter vi JSON.parse
            Lesson.create(JSON.parse(req.params.lessonInfo), (error2, result2) => {
                if (result2) {
                    // JSON.stringify gør, at vi henter dataen tilbage
                    res.send(JSON.stringify(result2));
                } else {
                    // Alle lektioner skal have et unikt lektionsnavn
                    console.log("Your lesson doesn't have an unique name");
                    res.send("error")
                }
            })
        } else {
            res.send("error2") // vi smider forskellige strings ind, for at detektere fejl hurtigere
        }
    })
};

