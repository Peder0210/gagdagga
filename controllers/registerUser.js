//Finder en bruger med de oplyste betingelser og returnerer dataen
module.exports = (req,res) => {

    const User = require("../models/user");

    let userInfo = JSON.parse(req.params.userInfo);
    console.log(userInfo);
    User.create(userInfo, (error, result) => {
        if (result) {
            res.send(JSON.stringify(result));
        } else {
            console.log("User doesn't have an unique username");
            res.send("error")
        }
    })
};



