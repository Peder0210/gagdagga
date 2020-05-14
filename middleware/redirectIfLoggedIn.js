module.exports = (req, res, next) =>{
    //Kontrollerer, at en kunder eller admin ikke kan gå på loginsiden, efter de har logget ind
    if(req.session.userid){
        if(req.session.userType === "Customer") {
            res.redirect('customerPage')
        }
     if(req.session.userType === "Admin") {
         res.redirect('adminPage')
     }
     }
    next();
};

