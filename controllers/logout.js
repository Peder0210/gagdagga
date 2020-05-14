

module.exports = ( req,res) => {

//Bruges når en bruger logger ud, så req.session id'et bliver slettet
    req.session.destroy(function(err) {
        console.log("Session destroyed");
            if(err) {
                return console.log(err)
                // return next(err);
            } else {
                return res.redirect("login");
            }
        });
    };