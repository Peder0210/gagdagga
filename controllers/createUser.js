const User = require("../models/user");

//Skaber en bruger med req.params og returnerer dataen eller en string baseret på, om en fejl er opstået.
module.exports = (req,res) => {
    User.create(JSON.parse(req.params.user_obj), (error, result) => {
        if (error) {
            console.log("User doesn't have an unique username");
            res.send("User doesn't have an unique username")
        } else{
            console.log("User have been created");
            res.send(result)
        }
    })
};



