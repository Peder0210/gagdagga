const User = require('../models/user');


//
// Her opdateres en bestemt brugers oplysninger.
// Dette anvendes til siden updateUser.ejs
// - der er en side til at ændre brugeroplysninger.
//


module.exports =  (req,res)=> {
  // Opdater en bestemt bruger i databasen ud fra session.id, usertype samt de nye oplysninger.
  User.updateOne({$and:[{_id:req.session.userId},{Usertype: "Customer"}]},{$set: JSON.parse(req.params.user_obj)}, (error, result) => {
    // Samme metode som updateLesson.js
    if(result){
      if(error){
        res.send("User doesn't have an unique username")
      }
      else{
        res.send(JSON.stringify(result));
      }
    }
    else{
      res.send("error")
    }
  })
};
