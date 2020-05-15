const Lesson = require("../models/lesson");

module.exports = (req,res)=> {
    console.log(JSON.parse(req.params.lesson_updatedInfo)[1]);
    Lesson.updateOne({_id: JSON.parse(req.params.lesson_updatedInfo)[0]},
    {$set: JSON.parse(req.params.lesson_updatedInfo)[1]}, (error, result) => {
        //Finder lektionen ud fra id-key og erstarter objektet med de nye informationer,
        // da blev sendt som et objekt i req.params .
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

