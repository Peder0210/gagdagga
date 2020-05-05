 module.exports = (req,res)=> {

     const UserLesson = require("../models/userlesson");

     console.log(req.session);
    UserLesson.deleteOne({$and:[{userid: req.session.userId},{lessonid: JSON.parse(req.params.lesson)[0]}]}, (error,result)=>{
        if(result){ // Sletter den user, hvor userlesson_id og user_id passer sammen. Fordi det er many-to-many forhold, må man tjekke begge veje.
            // En user kan være tilmeldt mange lesson, og en lesson kan have mange tilmeldte.
            console.log(result);
            res.send(result);
        } else{
            console.log(error);
            res.send(result);
        }
    });
};