const Booking = require("../models/booking");

module.exports = (req,res)=> {
    console.log(req.params.booking_lessonid);
    console.log(req.session);
    Booking.deleteOne({$and:[{userid: req.session.userId},{lessonid: req.params.booking_lessonid}]}, (error,result)=>{
        if(result){
            // Sletter den bookning, hvor userid og lessonid passer sammen. Dermed kontrolleres der, at kun en enkelt lektion bliver slettet og aldrig flere, selvom brugeren har booket flere lektioner

            console.log("Booking deleted");
            res.send(result);
        } else{
            console.log("No Booking found");
            res.send(error);
        }
    });
};