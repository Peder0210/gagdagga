const Booking = require("../models/booking");
module.exports = (req,res)=> {


console.log(req.params.booking_lessonid);
     console.log(req.session);
    Booking.deleteOne({$and:[{userid: req.session.userId},{lessonid: req.params.booking_lessonid}]}, (error,result)=>{
        if(result){ // Sletter den user, hvor userlesson_id og user_id passer sammen. Fordi det er many-to-many forhold, må man tjekke begge veje.
            // En user kan være tilmeldt mange lesson, og en lesson kan have mange tilmeldte.
            console.log(result);
            res.send(result);
        } else{
            console.log(error);
            res.send(error);
        }
    });
};