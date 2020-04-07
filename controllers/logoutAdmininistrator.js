module.exports = (req, res) =>{
    //With req.session.destroy we destroy all session data including the session admin id.
    req.session.destroy(() =>{
        //we redirect to the login page
        res.redirect('/login')
    })
}