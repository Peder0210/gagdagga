module.exports = (req,res)=> {
    const User = require("../models/user");

    User.deleteOne({_id: req.session.userId}, (error, result) => { // du sletter en lektion ud fra den informerede titel
        if (result) {
            console.log("User deleted");
            res.send(result)
        } else {
            res.send("No profiles found")
        }
    })
};