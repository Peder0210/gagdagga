const bcrypt  = require('bcrypt');
const administrator = require('../models/administratorData');

module.exports = (req,res)  =>{
    const {username, Password} = req.body;

    administrator.findOne({Username: username}, (error,administrator) => {
        if(administrator) {
            bcrypt.compare(Password, administrator.Password, (error, same) => {
                if (same) {
                    res.redirect('/')
                } else {
                    res.redirect('/login2/auth')
                }
            })
        } else {
            res.redirect('/login2/auth')
        }
    })
};

