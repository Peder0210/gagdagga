const Lesson = require("../models/lesson");


//
// Her findes en bestemt lektion, som så kan ændres i, clientside.
// Dette anvendes til siden updateLesson.ejs
// - der er en side til at ændre lektioner.
//


module.exports =  (req,res)=>{
  // Finder den lektion man gerne vil ændre ud fra id og returnerer dataen.
  Lesson.findOne({_id:req.params.lesson_id},(error,result)=>{
    if(result) {
      res.send(JSON.stringify(result))
    }
    else{
      res.send(error)
    }
  })
};
