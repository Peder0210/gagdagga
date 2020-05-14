const User = require('../models/user');
module.exports =  (req,res)=> {



    User.updateOne({$and:[{_id:req.session.userId},{Usertype: "Customer"}]},{$set: JSON.parse(req.params.user_obj)}, (error, result) => {
        // Samme metode som updateLesson.js
        if (result) {
            if(error){
                res.send("User doesn't have an unique username")
            } else {
                res.send(JSON.stringify(result));
            }
        } else {
            res.send("error")
        }
    })
};