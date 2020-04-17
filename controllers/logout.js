

module.exports = ( req,res) => {


    req.session.destroy(function(err) {
            if(err) {
                return console.log(err)
                // return next(err);
            } else {
                return res.redirect("/");
            }
        });
    }