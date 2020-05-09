const User = require("../models/user");
const Booking = require("../models/booking");
module.exports = (req,res)=> {


    User.deleteOne({_id: req.session.userId}, (error, result) => {
        if (result) {
            Booking.deleteMany({userid:req.session.userId}, (error, result) =>{
                if(result){
                    console.log("User deleted");
                    req.session.destroy();
                    console.log(req.session)
                } else {
                    console.log("hej")
                }
            });
            console.log("User deleted");
            res.send(result)
        } else {
            res.send("No profiles found")
        }
    })
};