const User = require("../models/user");
const bcrypt  = require('bcrypt');


//
// Her verificeres brugerens angivede oplysninger ved login.
// Dette anvendes til siden login.ejs
// - der er en side til at logge ind på platformen.
//


module.exports = (req,res) =>{
  console.log(req.body);
  // Find brugeren i databasen, ud fra 'username' og 'password'.
  // req.body er et array med to data: [username:string,password:string]
  User.findOne({Username: req.body[0]}, (error, result) => {
    if(result){
      // Dekryptere for at se om det indtastede er den korrekte password
      bcrypt.compare(req.body[1], result.Password, (error, same) => {
        if (same) {
          // Tilføj brugervariable til sessions objektet.
          req.session.userId = result._id;
          req.session.userType = result.Usertype;
          console.log(req.session);
          console.log("User info confirmed");
          // Sender  usertype tilbage så login siden ved, om det er en kunder eller admin
          res.send(result.Usertype)
        }
        else{
          console.log("Password is wrong");
          res.send("Password is wrong")
        }
      })
    }
    else{
      console.log("Username doesn't exist");
      res.send("Username doesn't exist")
    }
  })
};
