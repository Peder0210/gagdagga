const bcrypt  = require('bcrypt');
const User = require('../models/user');





module.exports = (req,res) =>{
    const {Username, Password} = req.body;
    console.log(req.body);
    User.findOne({Username:Username},(error,User) =>{
        if(User){
            bcrypt.compare(Password, User.Password, (error, same) =>{
                if(same){
                    req.session.userId = User._id;
                    console.log(User);
                    //res.redirect('/myPageUser?username='+Username+"&Email="+User.Email)
                    res.redirect('/myPageUser?username='+Username)

                }
                else{
                    let error = "Passwordiswrong";
                    console.log(error);
                    res.redirect('/login?error='+error)
                }
            })
        } else {
            let error = "Userdoesn'texist";
            console.log(error);
            res.redirect('/login?error='+error)
        }
    })
};