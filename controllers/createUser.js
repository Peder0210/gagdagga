const User = require("../models/user");
//Finder en bruger med de oplyste betingelser og returnerer dataen
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



