const bcrypt  = require('bcrypt');
const User = require('../models/userData');





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
            console.log("User doesn't exist");
            res.redirect('/login')
        }
    })
};