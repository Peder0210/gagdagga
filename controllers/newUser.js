module.exports =  (req,res) => {
    console.log(req.body);
    console.log("Hej");
     UserData.create(req.body,(error,userdata) =>{
        res.redirect('/login')
    })
};