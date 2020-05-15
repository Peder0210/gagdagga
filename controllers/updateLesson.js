const Lesson = require("../models/lesson");


//
// Her kan admins opdatere en lektion.
// Dette anvendes til siden updateLesson.ejs
// - der er en side til at ændre lektioner.
//


module.exports = (req,res)=> {
  console.log(JSON.parse(req.params.lesson_updatedInfo)[1]);
  //Finder lektionen ud fra id-key og erstatter objektet med de nye informationer, da blev sendt som et objekt i req.params.
  Lesson.updateOne({_id: JSON.parse(req.params.lesson_updatedInfo)[0]},{$set: JSON.parse(req.params.lesson_updatedInfo)[1]}, (error, result) => {
    if(result){
      if(error){
        res.send("Lesson doesn't have an unique title");
      }
      else{
        res.send(JSON.stringify(result));
      }
    }
    else{
      res.send("error")
    }
  })
};
