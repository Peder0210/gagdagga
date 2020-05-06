 module.exports = (req,res)=> {

     const Lesson = require("../models/lesson");

     console.log(JSON.parse(req.params.lesson_updatedInfo)[1]);
    Lesson.updateOne({Title: JSON.parse(req.params.lesson_updatedInfo)[0]},{$set: JSON.parse(req.params.lesson_updatedInfo)[1]}, (error, result) => {
        // opdaterer informationerne ud fra titel-key.
        if (result) {
            console.log("det virker :)");
            if(error){
                res.send("error")
            } else {
                res.send(JSON.stringify(result));
            }
        } else {
            res.send("error")
        }
    })
};