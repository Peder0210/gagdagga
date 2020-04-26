

module.exports = ( req,res) => {


    req.session.destroy(function(err) {
        console.log("It works")
            if(err) {
                return console.log(err)
                // return next(err);
            } else {
                return res.redirect("login");
            }
        });
    }