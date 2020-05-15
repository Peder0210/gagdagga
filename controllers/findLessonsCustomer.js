const User = require('../models/user');
const Lesson = require("../models/lesson");


//
// Her hentes alle lektionerne, kun for admins.
// Dette anvendes til siden lessonsCustomer.ejs
// - der er en side til at opstille alle lektioner.
//


module.exports = (req,res)=>{
  //Samme metode som findLessonsAdmin undtaget at der søges på Usertype: Customer
  User.findOne({$and:[{_id:req.session.userId},{Usertype: "Customer"}]},(error,result)=>{
    if(result){
      // Alle lektionerne hentes via. Lesson.find(), ingen parametre da alt skal hentes fra kollektionen.
      Lesson.find({}, (error, result) => {
        if (result) {
          res.send(JSON.stringify(result))
        }
        else{
          res.send("No documents found")
        }
      })
    }
    else{
      res.send("error2")
    }
  })
};
