const Lesson = require("../models/lesson");
module.exports = (req,res)=> {



     console.log(JSON.parse(req.params.lesson_updatedInfo)[1]);
    Lesson.updateOne({Title: JSON.parse(req.params.lesson_updatedInfo)[0]},{$set: JSON.parse(req.params.lesson_updatedInfo)[1]}, (error, result) => {
        // opdaterer informationerne ud fra titel-key.
        if (result) {
            if(error){
                res.send("Lesson doesn't have an unique title")
            } else {
                res.send(JSON.stringify(result));
            }
        } else {
            res.send("error")
        }
    })
};