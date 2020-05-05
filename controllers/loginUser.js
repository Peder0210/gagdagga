module.exports = (req,res) =>{

    const User = require("../models/user");
    const bcrypt  = require('bcrypt');

    console.log(req.body); //
    User.findOne({Username: req.body[0]}, (error, result) => { //req.body er et array af 2 ting (username og password)
        if (result){
            //dekryptere for at se om det indtastede er den korrekte password
            bcrypt.compare(req.body[1], result.Password, (error, same) => {
                if (same) {
                    console.log(result._id);
                    req.session.userId = result._id;
                    console.log(req.session);
                    console.log("User info confirmed");
                    // henter usertype info tilbage fra databasen
                    res.send(JSON.stringify([req.body[0],result.Usertype]))
                }
                else{
                    console.log("Password is wrong");
                    res.send("Password is wrong")
                }
            })
        } else {
            console.log("Username doesn't exist");
            res.send("Username doesn't exist")
        }
    })
};
