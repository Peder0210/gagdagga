const Lesson = require("../models/lesson");
module.exports =  (req,res) =>{
    Lesson.findOne({_id:req.params.lesson_id},(error,result)=>{ //finder den lektion man gerne vil ændre ud fra id og returnerer dataen.
        if(result) {
            res.send(JSON.stringify(result))
        }
        else{
            res.send(error)
        }
    })
};