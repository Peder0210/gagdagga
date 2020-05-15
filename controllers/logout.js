

//
// Her logger brugeren ud ved at slette sin 'session'.
// Dette anvendes til alle siderne.
// - giver brugeren muligheden for at logge ud.
//


module.exports = ( req,res) => {
  // Bruges når en bruger logger ud, så req.session id'et bliver slettet
  req.session.destroy(function(err) {
    console.log("Session destroyed");
    if(err) {
      return console.log(err)
    }
    else{
      return res.redirect("login");
    }
  });
};
