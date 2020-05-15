const User = require("../models/user");
const Booking = require("../models/booking");


//
// Her slettes en bestemt bruger.
// Dette anvendes til siden adminPage.ejs
// - der er en admin side, med fuldmagt over platformen.
//


module.exports = (req,res)=> {
  //Samme fremgangsmåde som deleteLesson undtagen, at userid bliver brugt i stedet for lessonid.
  User.deleteOne({_id: req.session.userId}, (error, result) => {
    if(result){
      // Alle brugerens bookninger bliver slettet samtidigt.
      Booking.deleteMany({userid:req.session.userId}, (error, result) =>{
        if(result){
          console.log("Bookings deleted");
          req.session.destroy();
          console.log(req.session);
        }
        else {
          console.log("No Bookings deleted");
        }
      });
      console.log("User deleted");
      res.send(result)
    }
    else{
      res.send("No profiles found");
    }
  })
};
