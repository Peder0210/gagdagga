const User = require("../models/user");
const Booking = require("../models/booking");

module.exports = (req,res)=> {
    User.deleteOne({_id: req.session.userId}, (error, result) => { //Præcis samme metode som deleteLesson undtagen, at userid bliver brugt i stedet for lessonid
        if (result) {
            Booking.deleteMany({userid:req.session.userId}, (error, result) =>{
                if(result){
                    console.log("Bookings deleted");
                    req.session.destroy();
                    console.log(req.session)
                } else {
                    console.log("No Bookings deleted")
                }
            });
            console.log("User deleted");
            res.send(result)
        } else {
            res.send("No profiles found")
        }
    })
};