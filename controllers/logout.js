

module.exports = ( req,res) => {


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