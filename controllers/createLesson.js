const User = require('../models/user');
const Lesson = require("../models/lesson");

module.exports = (req,res) => {
    console.log(req.session);
    // Vi tjekker om req.session userid er en Admin, fordi en customer ikke må have adgang til at oprette en lesson
    User.findOne({$and:[{_id:req.session.userId},{Usertype: "Admin"}]},(error,result)=>{
        if(result){
            console.log(result);
            // Vi opretter en lesson. For at vi kan oprette objektet lesson_obj i databasen, benyttes JSON.parse
            Lesson.create(JSON.parse(req.params.lesson_obj), (error2, result2) => {
                if (result2) {
                    console.log("Lesson have been created");
                    res.send(JSON.stringify(result2));
                } else {
                    // Hvis der opstår en fejl, er det på grund af, at alle lektioner skal have et unikt lektionsnavn, da vi har gjordt dette [uniqe: true] i schema
                    console.log("Your lesson doesn't have an unique Title");
                    res.send("Your lesson doesn't have an unique Title")
                }
            })
        } else {
            //Hvis User.findOne ikke kan finde et dokument i databasen, betyder dette, at ingen er logget ind som admin
            console.log("Please log in as an Admin");
            res.send("Please log in as an Admin")
        }
    })
};

