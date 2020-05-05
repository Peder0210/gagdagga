module.exports = (req,res)=> {

    const User = require('../models/user');
    const Lesson = require("../models/lesson");

    User.findOne({$and:[{_id:req.session.userId},{Usertype: "Customer"}]},(error,result)=>{ //Søger på users i databasen og bliver tildelt et unikt session id.
        if(result){ // hvis man er en customer får man lov til at se lektionerne.
            Lesson.find({Duration: {$gt: 0}}, (error, result) => {
                if (result) {
                    res.send(JSON.stringify(result))
                } else {
                    res.send("No profiles found")
                }
            }) //find alle duration hvor man laver et null  (det gør vi med alle).
        } else{
            res.send("error2")
        }
    })
};