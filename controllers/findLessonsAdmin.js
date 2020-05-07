
const User = require("../models/user");
const Lesson = require("../models/lesson");


module.exports = (req,res) => {

     User.findOne({$and:[{_id:req.session.userId},{Usertype: "Admin"}]},(error,result)=>{
        if(result){ // hvis man er en admin får man lov til at se lektionerne.
            Lesson.find({}, (error, result) => {
                if (result) {
                    res.send(JSON.stringify(result))
                } else {
                    res.send("No profiles found")
                }
            }) //find alle duration hvor man laver et null. (det gør vi med alle).
        } else{
            res.send("error2")
        }
    })
};
