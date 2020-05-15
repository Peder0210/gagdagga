const User = require("../models/user");
const bcrypt  = require('bcrypt');


module.exports = (req,res) =>{
    console.log(req.body); //
    User.findOne({Username: req.body[0]}, (error, result) => { //req.body er et array af 2 ting [username,password]
        if (result){
            //dekryptere for at se om det indtastede er den korrekte password
            bcrypt.compare(req.body[1], result.Password, (error, same) => {
                if (same) {
                    req.session.userId = result._id;
                    req.session.userType = result.Usertype;
                    console.log(req.session);
                    console.log("User info confirmed");
                    // Sender  usertype tilbage så login siden ved, om det er en kunder eller admin
                    res.send(result.Usertype)
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