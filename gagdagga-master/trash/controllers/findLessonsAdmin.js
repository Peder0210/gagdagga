const User = require("../models/user");
const Lesson = require("../models/lesson");

module.exports = (req,res) => {
     User.findOne({$and:[{_id:req.session.userId},{Usertype: "Admin"}]},(error,result)=>{
        if(result){ // hvis man er en admin får man lov til at se lektionerne.
            Lesson.find({}, (error, result) => { //Der er ingenting inde i Lesson.find(), da alle lektioner skal hentes
                if (result) {
                    res.send(JSON.stringify(result))
                } else {
                    res.send("No documents found")
                }
            })
        } else{
            res.send("No admin found")
        }
    })
};
