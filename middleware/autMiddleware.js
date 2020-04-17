/*const administrator = require("../test")

module.exports = (req,res, next) => {
    administrator.findById(req.session.userId, (error, user) =>{
        if(error || !user)
            return res.redirect("login")

        next()
    })
} */