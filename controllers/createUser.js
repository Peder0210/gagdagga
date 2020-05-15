const User = require("../models/user");


//
// Her oprettes ny bruger.
// Dette anvendes til siden createUser.ejs
// - der er til for nye brugere, så de kan oprette en profil på platformen.
//


module.exports = (req,res) => {
  //Skaber en bruger med req.params og returnerer dataen eller en string baseret på, om en fejl er opstået.
  User.create(JSON.parse(req.params.user_obj), (error, result) => {
    if(error){
      console.log("User doesn't have an unique username");
      res.send("User doesn't have an unique username");
    }
    else{
      console.log("User have been created");
      res.send(result);
    }
  })
};
