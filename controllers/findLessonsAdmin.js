const User = require("../models/user");
const Lesson = require("../models/lesson");

//
// Her hentes alle lektionerne, kun for admins.
// Dette anvendes til siden lessonsAdmin.ejs
// - der er en side til at administrere lektioner for admins.
//


module.exports = (req,res)=>{
  // Der tjekkes om brugeren er 'admin'.
  User.findOne({$and:[{_id:req.session.userId},{Usertype: "Admin"}]},(error,result)=>{
    if(result){
      // Alle lektionerne hentes via. Lesson.find(), ingen parametre da alt skal hentes fra kollektionen.
      Lesson.find({}, (error, result)=>{
        if (result) {
          res.send(JSON.stringify(result))
        } else {
          res.send("No documents found")
        }
      })
    }
    else{
        res.send("No admin found")
    }
  })
};
