module.exports = (req, res, next) =>{
    if(req.session.userId){
        return res.redirect("MyPageUser") //Hver gang en bruger som er logged in prøver at tilgå register eller login bliver de henvist tilbage til mypage.
    }
    next()
}