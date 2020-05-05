module.exports = (req,res)=> {
    const Lesson = require("../models/lesson");

    console.log(req.params.lesson);
    Lesson.deleteOne({Title: req.params.lesson}, (error, result) => { // du sletter en lektion ud fra den informerede titel
        if (result) {
            res.send(JSON.stringify(result))
        } else {
            res.send("No profiles found")
        }
    })
};