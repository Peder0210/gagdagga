module.exports = (req, res, next) =>{
    if(req.session.userid){
        if(req.session.userType == "Customer")
        return res.redirect('customerPage')
    } if(req.session.userType == "Admin"){
        return res.redirect('adminPage')
    }
    next();
}

