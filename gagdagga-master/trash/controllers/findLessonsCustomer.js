const User = require('../models/user');
const Lesson = require("../models/lesson");

module.exports = (req,res)=> {
    User.findOne({$and:[{_id:req.session.userId},{Usertype: "Customer"}]},(error,result)=>{ //Samme metode som findLessonsAdmin undtaget at der søges på Usertype: Customer
        if(result){
            Lesson.find({}, (error, result) => {
                if (result) {
                    res.send(JSON.stringify(result))
                } else {
                    res.send("No documents found")
                }
            })
        } else{
            res.send("error2")
        }
    })
};