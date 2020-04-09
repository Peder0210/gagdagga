const bcrypt  = require('bcrypt');
const administrator = require('../models/administrator');


module.exports = (req,res) =>{
    const {Username, Password} = req.body;
    console.log(req.body);
    administrator.findOne({Username:Username},(error,administrator) =>{
        if(administrator){
                if(Password===administrator.Password){
                    res.redirect('/adminSite?username='+Username)
                    console.log("Hello Admin. You are now logged in!");
                }
                else{
                    let error = "Passwordiswrong";
                    console.log(error);
                    console.log(Password);
                    console.log(administrator.Password);
                    res.redirect('/login?error='+error);

                }
        } else {
            let error = "Administratordoesn'texist";
            console.log(error);
            //console.log(Password);
            console.log(administrator);
            res.redirect('/login?error='+error);
        }
    })
};
