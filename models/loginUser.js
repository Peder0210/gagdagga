const bcrypt  = require('bcrypt');
const User = require('../models/userData');

module.exports = (req,res)  =>{
    const {Username, Password} = req.body;


User.findOne({Username: username}, (error,user) => {
    if(user) {
        bcrypt.compare(Password, user.Password, (error, same) => {
            if (same) {
                req.session.userId = user._id
                res.redirect('/')
            } else {
                res.redirect('/login/auth')
            }
        })
    } else {
    res.redirect('/login/auth')
}
})
};