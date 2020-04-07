const bcrypt  = require('bcrypt');
const administrator = require('../models/administrator');


module.exports = (req,res) =>{
    const {Username, Password} = req.body;
    console.log(req.body);
    administrator.findOne({Username:Username},(error,administrator) =>{
        if(administrator){
                if(Password===administrator.Password){
                    res.redirect('/adminSite')
                    console.log("Hello Admin. You are now logged in!");
                }
                else{
                    console.log("Incorrect information entered. Password is wrong");
                    console.log(Password);
                    console.log(administrator.Password);
                    res.redirect('/login2')
                }
        } else {
            console.log("Administrator doesn't exist");
            console.log(Password);
            console.log(administrator);
            res.redirect('/login2')
        }
    })
};
